import { RewardsRequestsController } from "@/reward-requests/controller";
import { RewardRequestsService } from "@/reward-requests/service";
import { Module } from "@nestjs/common";
import { GrpcRewardRequestsService } from "./grpc-reward-requests.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "REWARD_REQUESTS",
        transport: Transport.GRPC,
        options: {
          url: "event:50052",
          package: "rewardrequests",
          protoPath: resolve(
            process.cwd(),
            "src/reward-requests/reward-requests.proto",
          ),
        },
      },
    ]),
  ],
  controllers: [RewardsRequestsController],
  providers: [RewardRequestsService, GrpcRewardRequestsService],
})
export class RewardRequestsModule {}
