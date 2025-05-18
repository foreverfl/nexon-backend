import { AuthRepository } from "@/auth/repository";
import { RegisterRequestDto } from "@/common/dto/auth.dto";
import { UserDocument } from "@/common/schema/user.schema";
import { status } from "@grpc/grpc-js";
import { Inject, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

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

    // TODO: 비밀번호 해싱은 여기에서!
    const created = await this.repository.save(data);
    return created;
  }
}
