import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "@/auth/controller";
import { GrpcAuthService } from "@/auth/grpc-auth.service";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { AuthService } from "@/auth/service";

import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: "AUTH",
        transport: Transport.GRPC,
        options: {
          url: "auth:50051",
          package: "auth",
          protoPath: resolve(process.cwd(), "src/auth/auth.proto"),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GrpcAuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [PassportModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
