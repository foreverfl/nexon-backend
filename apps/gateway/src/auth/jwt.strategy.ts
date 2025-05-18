import { GrpcAuthService } from "@/auth/grpc-auth.service";
import { ValidateResponseDto } from "@/common/dto/auth.dto";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: GrpcAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "my-secret",
    });
  }

  validate(payload: {
    userId: string;
    role: string;
  }): Promise<ValidateResponseDto> {
    return Promise.resolve({
      userId: payload.userId,
      role: payload.role,
      valid: true,
    });
  }
}
