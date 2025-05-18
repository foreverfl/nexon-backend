// src/rewards/schema/rewards-requests.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { HydratedDocument } from "mongoose";

export type RewardRequestDocument = HydratedDocument<RewardRequest>;

@Schema({ timestamps: { createdAt: "requestedAt", updatedAt: "updatedAt" } })
export class RewardRequest {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  rewardId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  })
  status: "pending" | "approved" | "rejected";

  @Prop()
  reason?: string; // 반려 사유 등

  @Prop()
  operatorId?: string; // 승인한 운영자 ID

  @Prop()
  approvedAt?: Date; // 승인 일시

  @Prop()
  auditLog?: string; // 감사자 메모 등

  @Prop({ default: false })
  isAudited: boolean;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
