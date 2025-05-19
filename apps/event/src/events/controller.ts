import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  DeleteEventRequestDto,
  DeleteEventResponseDto,
  GetAllEventsRequestDto,
  GetAllEventsResponseDto,
  GetEventByIdRequestDto,
  GetEventByIdResponseDto,
  UpdateEventRequestDto,
  UpdateEventResponseDto,
} from "@/common/dto/events.dto";
import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { EventsService } from "@/events/service";
import { Controller, UseInterceptors } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @GrpcMethod("EventsService", "CreateEvent")
  async createEvent(
    data: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    return this.eventsService.createEvent(data);
  }

  @GrpcMethod("EventsService", "GetAllEvents")
  async getAllEvents(
    data: GetAllEventsRequestDto,
  ): Promise<GetAllEventsResponseDto> {
    return this.eventsService.getAllEvents(data);
  }

  @GrpcMethod("EventsService", "GetEventById")
  async getEventById(
    data: GetEventByIdRequestDto,
  ): Promise<GetEventByIdResponseDto> {
    return this.eventsService.getEventById(data);
  }

  @GrpcMethod("EventsService", "UpdateEvent")
  async updateEvent(
    dto: UpdateEventRequestDto,
  ): Promise<UpdateEventResponseDto> {
    return this.eventsService.updateEvent(dto);
  }

  @GrpcMethod("EventsService", "DeleteEvent")
  async deleteEvent(
    dto: DeleteEventRequestDto,
  ): Promise<DeleteEventResponseDto> {
    return this.eventsService.deleteEvent(dto);
  }
}
