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

  async findAll(
    page: number,
    limit: number,
  ): Promise<[EventDocument[], number]> {
    const skip = (page - 1) * limit;
    const [events, total] = await Promise.all([
      this.eventModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.eventModel.countDocuments(),
    ]);
    return [events, total];
  }

  async findById(id: string): Promise<EventDocument> {
    return this.eventModel.findById(id).orFail().lean();
  }
}
