import {
  CreateEventRequestDto,
  CreateEventResponseDto,
} from "@/common/dto/events.dto";
import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { EventsService } from "@/events/service";
import { Controller, UseInterceptors } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @GrpcMethod("EventService", "CreateEvent")
  async createEvent(
    data: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    return this.eventsService.createEvent(data);
  }
}
