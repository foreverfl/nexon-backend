import { AuthModule } from "@/auth/module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI || ""), AuthModule],
})
export class AppModule {}
