import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_PACKAGE",
        transport: Transport.GRPC,
        options: {
          url: "localhost:50051",
          package: "auth",
          protoPath: resolve(process.cwd(), "src/common/proto/auth.proto"),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthClientModule {}
