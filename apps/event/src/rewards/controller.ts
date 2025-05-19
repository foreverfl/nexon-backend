import {
  CreateRewardRequestDto,
  CreateRewardResponseDto,
} from "@/common/dto/requests.dto";
import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { RewardsService } from "@/rewards/service";
import { Controller, UseInterceptors } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  onModuleInit() {
    console.log("🚀 [RewardsController] gRPC Initialized");
  }

  @GrpcMethod("RewardsService", "CreateReward")
  async createReward(
    data: CreateRewardRequestDto,
  ): Promise<CreateRewardResponseDto> {
    return this.rewardsService.createReward(data);
  }
}
