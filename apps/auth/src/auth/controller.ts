import { Controller, UseInterceptors } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AuthService } from "@/auth/service";
import { RegisterRequestDto, RegisterResponseDto } from "@/common/dto/auth.dto";
import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { JwtService } from "@/common/auth/jwt.service";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @GrpcMethod("AuthService", "Register")
  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user = await this.authService.register(data);
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  @GrpcMethod("AuthService", "Login")
  async login(data: { email: string; password: string }) {
    const user = await this.authService.validateUser(data.email, data.password);

    const accessToken = this.jwtService.signAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });
    const refreshToken = this.jwtService.signRefreshToken({
      userId: user._id.toString(),
    });

    await this.authService.saveRefreshToken(user._id.toString(), refreshToken);

    return { accessToken, refreshToken };
  }

  // TODO: 블랙리스트에 추가하는 로직 필요
  @GrpcMethod("AuthService", "Logout")
  logout(data: { accessToken: string }) {
    console.log("🚪 Logout called:", data);
    return {
      success: true,
    };
  }

  @GrpcMethod("AuthService", "RefreshToken")
  async refreshToken(data: { refreshToken: string }) {
    return this.authService.refreshTokens(data.refreshToken);
  }

  @GrpcMethod("AuthService", "Validate")
  validate(data: { accessToken: string }) {
    try {
      const payload = this.jwtService.verify<{ userId: string; role: string }>(
        data.accessToken,
      );
      return {
        userId: payload.userId,
        role: payload.role,
        valid: true,
      };
    } catch {
      return {
        userId: null,
        role: null,
        valid: false,
      };
    }
  }

  @GrpcMethod("AuthService", "GetRole")
  async getRole(data: { userId: string }) {
    const result = await this.authService.getRole(data.userId);

    return {
      userId: result.userId.toString(),
      role: result.role,
    };
  }
}
