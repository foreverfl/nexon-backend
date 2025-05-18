import { AuthRepository } from "@/auth/repository";
import { JwtService } from "@/common/auth/jwt.service";
import { RegisterRequestDto } from "@/common/dto/auth.dto";
import { RedisService } from "@/common/redis/redis.service";
import { UserDocument } from "@/common/schema/user.schema";
import { status } from "@grpc/grpc-js";
import { Inject, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository)
    private readonly repository: AuthRepository,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterRequestDto): Promise<UserDocument> {
    const existing = await this.repository.findByEmail(data.email);
    if (existing) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const created = await this.repository.save({
      ...data,
      password: hashed,
    });
    return created;
  }

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<UserDocument> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: "Invalid password",
      });
    }

    return user;
  }

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    const key = `refresh:${userId}`;
    const ttl = 60 * 60 * 24 * 7; // 7일

    await this.redisService.set(key, token, ttl);
  }

  async refreshTokens(oldRefreshToken: string) {
    const payload = this.jwtService.verify<{ userId: string }>(oldRefreshToken);

    const stored = await this.redisService.get(`refresh:${payload.userId}`);
    if (!stored || stored !== oldRefreshToken) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = this.jwtService.signAccessToken({
      userId: payload.userId,
      role: "USER",
    });

    const newRefreshToken = this.jwtService.signRefreshToken({
      userId: payload.userId,
    });

    await this.redisService.set(
      `refresh:${payload.userId}`,
      newRefreshToken,
      60 * 60 * 24 * 7,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getRole(userId: string): Promise<{ userId: string; role: string }> {
    const user = await this.repository.findByEmail(userId);

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "User not found",
      });
    }

    return {
      userId: user._id.toString(),
      role: user.role,
    };
  }
}
