import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  // jwt 생성
  sign(payload: object, expiresIn: string = "15m"): string {
    return this.jwt.sign(payload, { expiresIn });
  }

  // jwt 검증
  verify<T extends object = any>(token: string): T {
    return this.jwt.verify<T>(token);
  }

  signAccessToken(payload: object): string {
    return this.jwt.sign(payload, { expiresIn: "15m" });
  }

  signRefreshToken(payload: object): string {
    return this.jwt.sign(payload, { expiresIn: "7d" });
  }
}
