import { AuthModule } from "@/auth/module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb://root:1234@mongodb:27017/auth?authSource=admin",
    ),
    AuthModule,
  ],
})
export class AppModule {}
