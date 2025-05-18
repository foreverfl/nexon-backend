import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RewardDocument = HydratedDocument<Reward>;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true })
  type: "point" | "coupon" | "item" | "badge";

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  value?: number; // 포인트 수치 등

  @Prop()
  code?: string; // 쿠폰 코드 등

  @Prop()
  imageUrl?: string; // 보상 아이콘 이미지

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  createdBy: string; // 운영자 ID or 이름
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
