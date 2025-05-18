import { AuthController } from "@/auth/controller";
import { AuthRepository } from "@/auth/repository";
import { AuthService } from "@/auth/service";
import { JwtService } from "@/common/auth/jwt.service";
import { User, UserSchema } from "@/common/schema/user.schema";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "my-secret",
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService],
})
export class AuthModule {}
