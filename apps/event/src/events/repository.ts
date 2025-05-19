import { CreateEventRequestDto } from "@/common/dto/events.dto";
import { Event, EventDocument } from "@/common/schema/events.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(dto: CreateEventRequestDto): Promise<EventDocument> {
    const created = new this.eventModel(dto);
    return created.save();
  }
}
