import { GrpcAuthService } from "@/common/auth/grpc-auth.service";
import { JwtStrategy } from "@/common/auth/jwt.strategy";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, GrpcAuthService],
  exports: [PassportModule],
})
export class AuthModule {}
