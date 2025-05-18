import { AuthRepository } from "@/auth/repository";
import { RegisterRequestDto } from "@/common/dto/auth.dto";
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
