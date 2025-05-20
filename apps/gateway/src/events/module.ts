import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

import { EventsController } from "@/events/controller";
import { GrpcEventsService } from "@/events/grpc-events.service";
import { EventsService } from "@/events/service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EVENTS",
        transport: Transport.GRPC,
        options: {
          url: "event:50052",
          package: "events",
          protoPath: resolve(process.cwd(), "src/events/events.proto"),
        },
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, GrpcEventsService],
})
export class EventsModule {}
