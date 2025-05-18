import { AuthModule } from "@/auth/module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || ""),
    RedisModule.forRoot({
      type: "single",
      options: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
