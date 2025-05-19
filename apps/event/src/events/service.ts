import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  EventDto,
  GetAllEventsRequestDto,
  GetAllEventsResponseDto,
  GetEventByIdRequestDto,
  GetEventByIdResponseDto,
} from "@/common/dto/events.dto";
import { EventsRepository } from "@/events/repository";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async createEvent(
    dto: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    const created = await this.eventsRepository.create(dto);
    return {
      id: created._id.toString(),
    };
  }

  async getAllEvents(
    dto: GetAllEventsRequestDto,
  ): Promise<GetAllEventsResponseDto> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const [events, total] = await this.eventsRepository.findAll(page, limit);

    return {
      events: plainToInstance(EventDto, events),
      total,
      page,
      limit,
    };
  }

  async getEventById(
    dto: GetEventByIdRequestDto,
  ): Promise<GetEventByIdResponseDto> {
    const event = await this.eventsRepository.findById(dto.id);
    return { event: new EventDto(event) };
  }
}
