import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EVENT_PACKAGE",
        transport: Transport.GRPC,
        options: {
          url: "localhost:50052",
          package: "event",
          protoPath: resolve(process.cwd(), "src/common/proto/event.proto"),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class EventsClientModule {}
