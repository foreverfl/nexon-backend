import {
  RewardRequest,
  RewardRequestSchema,
} from "@/common/schema/reward-requests.schema";
import { RewardRequestsController } from "@/reward-requests/controller";
import { RewardRequestsRepository } from "@/reward-requests/repository";
import { RewardRequestsService } from "@/reward-requests/service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
  ],
  controllers: [RewardRequestsController],
  providers: [RewardRequestsService, RewardRequestsRepository],
})
export class RewardRequestsModule {}
