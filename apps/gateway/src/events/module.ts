import { EventsController } from "@/events/controller";
import { EventsService } from "@/events/service";
import { EventsClientModule } from "@/common/grpc/event-client.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [EventsClientModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
