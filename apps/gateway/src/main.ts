import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { HttpLoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle("API Gateway")
    .setDescription("MSA 구조 Gateway 서버 Swagger 문서")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 로깅 인터셉터 설정
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  // JWT 인증 및 권한 설정
  const reflector = app.get(Reflector);
  const rolesGuard = new RolesGuard(reflector);
  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.useGlobalGuards(jwtAuthGuard, rolesGuard);

  await app.listen(3000);
}

void bootstrap();
