import { RewardsRequestsController } from "@/reward-requests/controller";
import { RewardRequestsService } from "@/reward-requests/service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RewardsRequestsController],
  providers: [RewardRequestsService],
})
export class RewardsRequestsModule {}
