import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  GetAllEventsRequestDto,
  GetAllEventsResponseDto,
  GetEventByIdRequestDto,
  GetEventByIdResponseDto,
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

  @GrpcMethod("EventService", "GetAllEvents")
  async getAllEvents(
    data: GetAllEventsRequestDto,
  ): Promise<GetAllEventsResponseDto> {
    return this.eventsService.getAllEvents(data);
  }

  @GrpcMethod("EventService", "GetEventById")
  async getEventById(
    data: GetEventByIdRequestDto,
  ): Promise<GetEventByIdResponseDto> {
    return this.eventsService.getEventById(data);
  }
}
