import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from "@/common/dto/auth.dto";
import { ValidateResponseDto } from "@/common/dto/validate-response";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

interface GrpcAuthServiceClient {
  Register(data: RegisterRequestDto): Observable<RegisterResponseDto>;
  Login(data: LoginRequestDto): Observable<LoginResponseDto>;
  Validate(data: { accessToken: string }): Observable<ValidateResponseDto>;
}

@Injectable()
export class GrpcAuthService implements OnModuleInit {
  private grpcAuthService: GrpcAuthServiceClient;

  constructor(@Inject("AUTH") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcAuthService =
      this.client.getService<GrpcAuthServiceClient>("AuthService");
  }

  async register(data: RegisterRequestDto) {
    return lastValueFrom(this.grpcAuthService.Register(data));
  }

  async login(data: LoginRequestDto) {
    return lastValueFrom(this.grpcAuthService.Login(data));
  }

  async validateToken(
    accessToken: string,
  ): Promise<ValidateResponseDto | null> {
    if (!accessToken) throw new Error("Access token is required");
    return lastValueFrom(this.grpcAuthService.Validate({ accessToken }));
  }
}
