import { RewardsRequestsController } from "@/reward-requests/controller";
import { RewardsRequestsService } from "@/reward-requests/service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RewardsRequestsController],
  providers: [RewardsRequestsService],
})
export class RewardsRequestsModule {}
