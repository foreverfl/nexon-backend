import { RewardsController } from "@/rewards/controller";
import { RewardsService } from "@/rewards/service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardssModule {}
