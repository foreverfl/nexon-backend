import {
  RegisterEventRequestDto,
  RegisterEventResponseDto,
} from "@/common/dto/events.dto";
import { EventsRepository } from "@/events/repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventsRepository) {}

  async registerEvent(
    data: RegisterEventRequestDto,
  ): Promise<RegisterEventResponseDto> {
    const event = await this.eventRepository.create(data);
    return {
      eventId: event._id.toString(),
      title: event.title,
    };
  }
}
