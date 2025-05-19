import {
  CreateEventRequestDto,
  CreateEventResponseDto,
} from "@/common/dto/events.dto";
import { EventsRepository } from "@/events/repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventsRepository) {}

  async createEvent(
    dto: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    console.log("📦 EventsService.createEvent 진입");
    const created = await this.eventRepository.create(dto);
    console.log("✅ 저장 완료:", created);
    return {
      id: created._id.toString(),
    };
  }
}
