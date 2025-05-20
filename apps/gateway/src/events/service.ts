import {
  CreateEventRequestDto,
  GetAllEventsRequestDto,
  UpdateEventRequestDto,
} from "@/events/events.dto";
import { Injectable } from "@nestjs/common";
import { GrpcEventsService } from "./grpc-events.service";

@Injectable()
export class EventsService {
  constructor(private readonly grpc: GrpcEventsService) {}

  createEvent(dto: CreateEventRequestDto) {
    return this.grpc.createEvent(dto);
  }

  getAllEvents(dto: GetAllEventsRequestDto) {
    return this.grpc.getAllEvents(dto);
  }

  getEventById(id: string) {
    return this.grpc.getEventById({ id });
  }

  updateEvent(id: string, dto: UpdateEventRequestDto) {
    return this.grpc.updateEvent({ ...dto, id });
  }

  deleteEvent(id: string) {
    return this.grpc.deleteEvent({ id });
  }
}
