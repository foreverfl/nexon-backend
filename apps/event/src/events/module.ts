import { EventsController } from "@/events/controller";
import { EventsRepository } from "@/events/repository";
import { Event, EventSchema } from "@/common/schema/events.schema";
import { EventsService } from "@/events/service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class EventsModule {}
