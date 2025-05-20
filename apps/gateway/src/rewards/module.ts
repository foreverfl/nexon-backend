import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";

import { RewardsController } from "@/rewards/controller";
import { RewardsService } from "@/rewards/service";
import { GrpcRewardsService } from "@/rewards/grpc-rewards.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "REWARDS",
        transport: Transport.GRPC,
        options: {
          url: "event:50052",
          package: "rewards",
          protoPath: resolve(process.cwd(), "src/rewards/rewards.proto"),
        },
      },
    ]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService, GrpcRewardsService],
})
export class RewardsModule {}
