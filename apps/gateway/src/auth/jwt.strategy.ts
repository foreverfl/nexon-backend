import { GrpcAuthService } from "@/auth/grpc-auth.service";
import { ValidateRequestDto, ValidateResponseDto } from "@/common/dto/auth.dto";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: GrpcAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "dummy-secret",
    });
  }

  async validate(payload: ValidateRequestDto): Promise<ValidateResponseDto> {
    const user = await this.authService.validateToken(payload);
    return {
      userId: user.userId,
      role: user.role,
      valid: user.valid,
    };
  }
}
