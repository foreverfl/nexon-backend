import { GrpcRewardsService } from "@/rewards/grpc-rewards.service";
import {
  CreateRewardRequestDto,
  DeleteRewardRequestDto,
  GetAllRewardsRequestDto,
  GetRewardByIdRequestDto,
  UpdateRewardRequestDto,
} from "@/rewards/rewards.dto";
import { Injectable } from "@nestjs/common";

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

  updateReward(dto: UpdateRewardRequestDto & { id: string }) {
    return this.grpcRewardsService.updateReward(dto);
  }

  deleteReward(dto: DeleteRewardRequestDto) {
    return this.grpcRewardsService.deleteReward(dto);
  }
}
