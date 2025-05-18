import { GrpcAuthService } from "@/common/auth/grpc-auth.service";
import { ValidateResponseDto } from "@/common/dto/validate-response";
import { Injectable, UnauthorizedException } from "@nestjs/common";
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

  async validate(payload: any): Promise<ValidateResponseDto> {
    const user = await this.authService.validateToken(payload); // gRPC 호출
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // req.user 에 바인딩됨
  }
}
