import { GrpcAuthService } from "@/common/auth/grpc-auth.service";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH",
        transport: Transport.GRPC,
        options: {
          url: "localhost:30001",
          package: "auth",
          protoPath: resolve(process.cwd(), "src/common/proto/auth.proto"),
        },
      },
    ]),
  ],
  providers: [GrpcAuthService],
  exports: [GrpcAuthService],
})
export class AuthClientModule {}
