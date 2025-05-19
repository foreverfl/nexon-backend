import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ default: false })
  del_yn: boolean;

  @Prop() // 레벨 제한
  minLevel?: number;

  @Prop() // 특정 지역 서버 필터
  region?: string[];

  @Prop()
  worldType?: string; // 예: "리부트", "일반"

  @Prop()
  platform?: string; // 예: "PC방", "일반"

  @Prop({ type: [String], default: [] }) // 이벤트 분류 태그
  tags: string[]; // ["출석", "포인트", "이벤트"]

  @Prop() createdBy: string;

  @Prop({ type: [Types.ObjectId], ref: "Reward", default: [] })
  rewardIds: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
