import { Module } from "@nestjs/common";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@/common/schema/user.schema";
import { AuthRepository } from "@/auth/repository";
import { AuthRepositoryImpl } from "@/auth/repository.impl";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class AuthModule {}
