import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string; // 예: "출석체크 이벤트"

  @Prop({ required: true })
  description: string; // 예: "5일 연속 출석 시 보상 지급"

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ type: Object })
  dsl: any; // DSL 구조 (운영자 정의)

  @Prop({ type: [String], default: [] })
  tags: string[]; // 예: ['출석', '포인트', '이벤트']

  @Prop()
  createdBy: string; // 운영자 이름 or ID
}

export const EventSchema = SchemaFactory.createForClass(Event);
