import {
  CreateRewardRequestDto,
  CreateRewardResponseDto,
  DeleteRewardRequestDto,
  DeleteRewardResponseDto,
  GetAllRewardsRequestDto,
  GetAllRewardsResponseDto,
  GetRewardByIdRequestDto,
  GetRewardByIdResponseDto,
  UpdateRewardRequestDto,
  UpdateRewardResponseDto,
} from "@/common/dto/rewards.dto";
import { LoggingInterceptor } from "@/common/interceptor/logging.interceptor";
import { RewardsService } from "@/rewards/service";
import { Controller, UseInterceptors } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @GrpcMethod("RewardsService", "CreateReward")
  async createReward(
    data: CreateRewardRequestDto,
  ): Promise<CreateRewardResponseDto> {
    return this.rewardsService.createReward(data);
  }

  @GrpcMethod("RewardsService", "GetAllRewards")
  async getAllRewards(
    data: GetAllRewardsRequestDto,
  ): Promise<GetAllRewardsResponseDto> {
    return this.rewardsService.getAllRewards(data);
  }

  @GrpcMethod("RewardsService", "GetRewardById")
  async getRewardById(
    data: GetRewardByIdRequestDto,
  ): Promise<GetRewardByIdResponseDto> {
    return this.rewardsService.getRewardById(data);
  }

  @GrpcMethod("RewardsService", "UpdateReward")
  async updateReward(
    data: UpdateRewardRequestDto,
  ): Promise<UpdateRewardResponseDto> {
    return this.rewardsService.updateReward(data);
  }

  @GrpcMethod("RewardsService", "DeleteReward")
  async deleteReward(
    data: DeleteRewardRequestDto,
  ): Promise<DeleteRewardResponseDto> {
    return this.rewardsService.deleteReward(data);
  }
}
