import { AuthModule } from "@/auth/module";
import { EventsModule } from "@/events/module";
import { RewardssModule } from "@/rewards/module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AuthModule, EventsModule, RewardssModule],
})
export class AppModule {}
