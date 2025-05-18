import { EventsController } from "@/events/controller";
import { EventsService } from "@/events/service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
