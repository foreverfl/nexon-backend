import * as dotenv from "dotenv";
dotenv.config();

import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";

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
      package: "auth",
      protoPath: join(__dirname, "proto/auth.proto"),
      url: "0.0.0.0:50051",
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
        groupId: "auth-consumer",
      },
    },
  });

  // 두 개의 마이크로서비스(gRPC + Kafka)
  await app.startAllMicroservices();
  // HTTP 서버
  await app.listen(3000);
}

void bootstrap();
