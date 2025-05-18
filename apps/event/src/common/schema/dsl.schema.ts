import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false }) // embedded schema로만 쓰이므로 _id 제거
export class DslRule {
  @Prop({ required: true })
  type: string;

  @Prop()
  count?: number;
}

@Schema({ _id: false })
export class DslReward {
  @Prop({ required: true })
  type: string;

  @Prop()
  value?: number;

  @Prop()
  code?: string;
}

@Schema({ _id: false })
export class DslCondition {
  @Prop()
  userLevel?: string;

  @Prop({ type: [String] })
  region?: string[];
}

@Schema({ _id: false })
export class EventDsl {
  @Prop({ type: [DslRule], default: [] })
  rules: DslRule[];

  @Prop({ type: [DslReward], default: [] })
  rewards: DslReward[];

  @Prop({ type: DslCondition })
  conditions?: DslCondition;
}

export const EventDslSchema = SchemaFactory.createForClass(EventDsl);
