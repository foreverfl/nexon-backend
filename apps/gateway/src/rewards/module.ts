import { RewardsController } from "@/rewards/controller";
import { RewardsService } from "@/rewards/service";
import { EventsClientModule } from "@/common/grpc/event-client.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [EventsClientModule],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardssModule {}
