import { AuthModule } from "@/auth/module";
import { EventsModule } from "@/events/module";
import { RewardsModule } from "@/rewards/module";
import { Module } from "@nestjs/common";
import { RewardsRequestsModule } from "@/reward-requests/module";

@Module({
  imports: [AuthModule, EventsModule, RewardsModule, RewardsRequestsModule],
})
export class AppModule {}
