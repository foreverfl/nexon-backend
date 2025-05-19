import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { HydratedDocument } from "mongoose";

export type RewardRequestDocument = HydratedDocument<RewardRequest>;

@Schema({ timestamps: true })
export class RewardRequest {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Event", required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Reward", required: true })
  rewardId: Types.ObjectId;

  @Prop({ enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" })
  status: "PENDING" | "APPROVED" | "REJECTED";

  @Prop() // 지급 시각 (보상이 지급되었을 경우)
  fulfilledAt?: Date;

  @Prop() // 실패 사유나 관리자 메모
  comment?: string;

  @Prop({ default: false })
  del_yn: boolean;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
