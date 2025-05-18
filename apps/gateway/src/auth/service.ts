import { GrpcAuthService } from "@/auth/grpc-auth.service";
import {
  LoginRequestDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
  ValidateRequestDto,
  ValidateResponseDto,
} from "@/common/dto/auth.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private readonly grpcAuthService: GrpcAuthService) {}

  register(data: RegisterRequestDto) {
    return this.grpcAuthService.register(data);
  }

  login(data: LoginRequestDto) {
    return this.grpcAuthService.login(data);
  }

  refreshTokens(
    data: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.grpcAuthService.refreshToken(data);
  }

  validateToken(data: ValidateRequestDto): Promise<ValidateResponseDto> {
    return this.grpcAuthService.validateToken(data);
  }
}
