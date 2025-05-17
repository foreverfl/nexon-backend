import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "auth",
      protoPath: join(__dirname, "proto/auth.proto"),
      url: "0.0.0.0:50051",
    },
  });

  await app.startAllMicroservices(); // gRPC 서버
  await app.listen(3000); // HTTP 서버
}

void bootstrap();
