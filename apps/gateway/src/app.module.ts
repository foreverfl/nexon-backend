import { AuthModule } from "@/auth/module";
import { EventsModule } from "@/events/module";
import { RewardsModule } from "@/rewards/module";
import { Module } from "@nestjs/common";
import { RewardRequestsModule } from "@/reward-requests/module";

@Module({
  imports: [AuthModule, EventsModule, RewardsModule, RewardRequestsModule],
})
export class AppModule {}
