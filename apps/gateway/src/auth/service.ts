import { Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { RegisterRequestDto } from "@/common/dto/auth.dto";

interface AuthGrpcService {
  register(data: RegisterRequestDto): any;
}

@Injectable()
export class AuthService {
  private authService: AuthGrpcService;

  constructor(@Inject("AUTH_PACKAGE") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthGrpcService>("AuthService");
  }

  async register(data: RegisterRequestDto) {
    return await lastValueFrom(this.authService.register(data));
  }
}
