import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardsController } from "@/rewards/controller";
import { RewardsService } from "@/rewards/service";
import { RewardsRepository } from "@/rewards/repository";
import { Reward, RewardSchema } from "@/common/schema/rewards.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService, RewardsRepository],
})
export class RewardsModule {}
