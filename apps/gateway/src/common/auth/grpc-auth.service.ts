import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";
import { ValidateResponseDto } from "@/common/dto/validate-response";

interface GrpcAuthServiceClient {
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

  async validateToken(
    accessToken: string,
  ): Promise<ValidateResponseDto | null> {
    if (!accessToken) throw new Error("Access token is required");
    return lastValueFrom(this.grpcAuthService.Validate({ accessToken }));
  }
}
