import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { resolve } from "path";
import { AppModule } from "./app.module";
import mongoose from "mongoose";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 로깅 인터셉터 등록
  app.useGlobalInterceptors(new LoggingInterceptor());

  // gRPC 서버 연결
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ["events", "rewards", "rewardrequests"],
      protoPath: [
        resolve(process.cwd(), "src/events/events.proto"),
        resolve(process.cwd(), "src/rewards/rewards.proto"),
        resolve(process.cwd(), "src/reward-requests/reward-requests.proto"),
      ],
      url: "0.0.0.0:50052",
    },
  });

  // Kafka 서버 연결
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
      },
      consumer: {
        groupId: `auth-consumer-server-${Math.floor(Math.random() * 1000)}`,
      },
    },
  });

  // 두 개의 마이크로서비스(gRPC + Kafka)
  await app.startAllMicroservices();
  // HTTP 서버
  await app.listen(3000);
}

mongoose.set("debug", true);
void bootstrap();
