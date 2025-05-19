import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ _id: false })
export class DslRule {
  @Prop({ required: true }) // 규칙 종류
  type: string; // 예: "ATTENDANCE", "KILL_MOB", "CLEAR_QUEST", "STAY_ONLINE"

  @Prop() // 수치 조건
  count?: number;

  @Prop() // 대상 몬스터/퀘스트/맵 ID 등
  targetId?: string;

  @Prop() // 특정 요일만 적용
  daysOfWeek?: string[]; // ["MON", "FRI"]
}

@Schema({ _id: false })
export class DslReward {
  @Prop({ required: true }) // 보상 종류
  type: string; // 예: "POINT", "ITEM", "COUPON", "GOLD"

  @Prop() // 수치
  value?: number;

  @Prop() // 아이템 ID나 코드
  code?: string;
}

@Schema({ _id: false })
export class DslCondition {
  @Prop() // 유저 레벨 조건
  minLevel?: number;

  @Prop() // 지역 필터
  region?: string[];

  @Prop() // 유저 타입 등
  userType?: string;
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
