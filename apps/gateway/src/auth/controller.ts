import { AuthService } from "@/auth/service";
import { Public } from "@/common/decorator/public.decorator";
import { RegisterRequestDto } from "@/common/dto/auth.dto";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterRequestDto) {
    const result = await this.authService.register(dto);
    return { message: "Register success", data: result };
  }

  @Post("login")
  login() {
    return {
      accessToken: "stub-access-token",
      refreshToken: "stub-refresh-token",
    };
  }

  @Post("logout")
  logout() {
    return { success: true, message: "Stub: logout processed" };
  }

  @Post("refresh")
  refresh() {
    return {
      accessToken: "new-stub-access-token",
      refreshToken: "new-stub-refresh-token",
    };
  }

  @Get("me")
  getMe() {
    // 보통 req.user에서 꺼냄 (Guard 붙인 후)
    return {
      userId: "stub-user-id",
      email: "stub@example.com",
      role: "USER",
    };
  }

  @Get("role/:userId")
  getRole(@Param("userId") userId: string) {
    return {
      userId,
      role: "USER", // Stub 용으로 고정
    };
  }
}
