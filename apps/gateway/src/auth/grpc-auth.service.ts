import {
  LoginRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  ValidateRequestDto,
  ValidateResponseDto,
} from "@/auth/auth.dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

interface GrpcAuthServiceClient {
  Register(data: RegisterRequestDto): Observable<RegisterResponseDto>;
  Login(data: LoginRequestDto): Observable<LoginResponseDto>;
  RefreshToken(
    data: RefreshTokenRequestDto,
  ): Observable<RefreshTokenResponseDto>;
  Validate(data: ValidateRequestDto): Observable<ValidateResponseDto>;
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

  async refreshToken(
    data: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return lastValueFrom(this.grpcAuthService.RefreshToken(data));
  }

  async validateToken(data: ValidateRequestDto): Promise<ValidateResponseDto> {
    if (!data) throw new Error("Access token is required");
    return lastValueFrom(this.grpcAuthService.Validate(data));
  }
}
