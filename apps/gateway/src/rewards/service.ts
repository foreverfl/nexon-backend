import {
  CreateRewardRequestDto,
  GetRewardByIdRequestDto,
  UpdateRewardRequestDto,
  DeleteRewardRequestDto,
  GetAllRewardsRequestDto,
} from "@/rewards/rewards.dto";
import { Injectable } from "@nestjs/common";
import { GrpcRewardsService } from "./grpc-rewards.service";

@Injectable()
export class RewardsService {
  constructor(private readonly grpcRewardsService: GrpcRewardsService) {}

  createReward(dto: CreateRewardRequestDto) {
    return this.grpcRewardsService.createReward(dto);
  }

  getAllRewards(dto: GetAllRewardsRequestDto) {
    return this.grpcRewardsService.getAllRewards(dto);
  }

  getRewardById(dto: GetRewardByIdRequestDto) {
    return this.grpcRewardsService.getRewardById(dto);
  }

  updateReward(dto: UpdateRewardRequestDto) {
    return this.grpcRewardsService.updateReward(dto);
  }

  deleteReward(dto: DeleteRewardRequestDto) {
    return this.grpcRewardsService.deleteReward(dto);
  }
}
