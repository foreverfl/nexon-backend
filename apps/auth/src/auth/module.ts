import { AuthController } from "@/auth/controller";
import { AuthRepository } from "@/auth/repository";
import { AuthService } from "@/auth/service";
import { User, UserSchema } from "@/common/schema/user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
