import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true })
  type: string; // 예: "ITEM", "POINT", "MESO", "TITLE", "EXP"

  @Prop()
  itemId?: number; // 아이템 ID

  @Prop()
  value?: number; // 수치 보상 (메소/포인트/EXP 등)

  @Prop()
  duration?: number; // 기간제 보상일 경우 (단위: 일)

  @Prop()
  description?: string; // 관리자 설명용

  @Prop({ default: false })
  del_yn: boolean;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
