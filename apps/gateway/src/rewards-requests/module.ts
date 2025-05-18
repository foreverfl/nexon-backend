import { RewardsRequestsController } from "@/rewards-requests/controller";
import { RewardsRequestsService } from "@/rewards-requests/service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RewardsRequestsController],
  providers: [RewardsRequestsService],
})
export class RewardsRequestsModule {}
