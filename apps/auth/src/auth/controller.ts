import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AuthService } from "@/auth/service";
import { RegisterRequestDto, RegisterResponseDto } from "@/common/dto/auth.dto";

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @GrpcMethod("AuthService", "Register")
  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user = await this.appService.register(data);
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  @GrpcMethod("AuthService", "Login")
  login(data: { email: string; password: string }) {
    console.log("🚀 Login called:", data);
    return {
      accessToken: "123",
      refreshToken: "456",
    };
  }

  @GrpcMethod("AuthService", "Logout")
  logout(data: { accessToken: string }) {
    console.log("🚪 Logout called:", data);
    return {
      success: true,
    };
  }

  @GrpcMethod("AuthService", "RefreshToken")
  refreshToken(data: { refreshToken: string }) {
    console.log("♻️ RefreshToken called:", data);
    return {
      refreshToken: "new-refresh-token",
    };
  }

  @GrpcMethod("AuthService", "Validate")
  validate(data: { accessToken: string }) {
    console.log("🔍 Validate called:", data);
    return {
      userId: "1",
      role: "USER",
      valid: true,
    };
  }
}
