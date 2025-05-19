import { EventsModule } from "@/events/module";
import { RewardsModule } from "@/rewards/module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 어디서든 ConfigService 주입 없이 사용 가능
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || ""),
    RedisModule.forRoot({
      type: "single",
      options: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    }),
    EventsModule,
    RewardsModule,
  ],
})
export class AppModule {}
