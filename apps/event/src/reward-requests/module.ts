import { Event, EventSchema } from "@/common/schema/events.schema"; // ✅ 수정됨
import {
  RewardRequest,
  RewardRequestSchema,
} from "@/common/schema/reward-requests.schema";
import { Reward, RewardSchema } from "@/common/schema/rewards.schema";
import { EventsRepository } from "@/events/repository";
import { RewardRequestsController } from "@/reward-requests/controller";
import { RewardRequestsRepository } from "@/reward-requests/repository";
import { RewardRequestsService } from "@/reward-requests/service";
import { RewardsRepository } from "@/rewards/repository";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [RewardRequestsController],
  providers: [
    RewardRequestsService,
    RewardRequestsRepository,
    EventsRepository,
    RewardsRepository,
  ],
})
export class RewardRequestsModule {}
