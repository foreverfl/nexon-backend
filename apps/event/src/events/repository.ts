import { Event, EventDocument } from "@/common/schema/events.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(data: { title: string; description?: string }) {
    return this.eventModel.create(data);
  }
}
