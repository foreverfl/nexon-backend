import { AuthController } from "@/auth/controller";
import { AuthService } from "@/auth/service";
import { AuthClientModule } from "@/common/grpc/auth-client.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AuthClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
