import { AuthService } from "@/auth/service";
import { Public } from "@/common/decorator/public.decorator";
import {
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
} from "@/auth/auth.dto";
import { ServiceError, status } from "@grpc/grpc-js";
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterRequestDto) {
    try {
      return await this.authService.register(dto);
    } catch (err: unknown) {
      const grpcError = err as ServiceError;

      if (grpcError.code === status.ALREADY_EXISTS) {
        throw new ConflictException(
          grpcError.details || "Email already exists",
        );
      }

      throw new InternalServerErrorException(
        "Unexpected error from AuthService",
      );
    }
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
