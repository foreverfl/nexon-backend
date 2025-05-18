import { GrpcAuthService } from "@/auth/grpc-auth.service";
import { RegisterRequestDto } from "@/common/dto/auth.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly grpcAuthService: GrpcAuthService) {}

  register(data: RegisterRequestDto) {
    return this.grpcAuthService.register(data);
  }

  validateToken(token: string) {
    return this.grpcAuthService.validateToken(token);
  }
}
