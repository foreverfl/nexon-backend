import { AuthService } from "@/auth/service";
import { Public } from "@/common/decorator/public.decorator";
import {
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
} from "@/common/dto/auth.dto";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterRequestDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  async login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post("logout")
  logout() {
    return {
      success: false,
      message: "Logout functionality has not been implemented yet.",
    };
  }

  @Post("refresh")
  refresh(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.refreshTokens(dto);
  }
}
