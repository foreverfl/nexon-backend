import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { HttpLoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  const reflector = app.get(Reflector);
  const rolesGuard = new RolesGuard(reflector);
  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.useGlobalGuards(jwtAuthGuard, rolesGuard);

  await app.listen(3000);
}

void bootstrap();
