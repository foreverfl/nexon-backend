import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { method, url } = request;

    const now = Date.now();
    this.logger.log(`📥 ${method} ${url} called`);

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        this.logger.log(`✅ ${method} ${url} completed in ${delay}ms`);
      }),
    );
  }
}
