import {
  CreateRewardRequestDto,
  CreateRewardResponseDto,
  DeleteRewardRequestDto,
  DeleteRewardResponseDto,
  GetAllRewardsRequestDto,
  GetAllRewardsResponseDto,
  GetRewardByIdRequestDto,
  GetRewardByIdResponseDto,
  RewardDto,
  UpdateRewardRequestDto,
  UpdateRewardResponseDto,
} from "@/common/dto/rewards.dto";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { RewardsRepository } from "./repository";
@Injectable()
export class RewardsService {
  constructor(private readonly rewardsRepository: RewardsRepository) {}

  async createReward(
    dto: CreateRewardRequestDto,
  ): Promise<CreateRewardResponseDto> {
    const reward = await this.rewardsRepository.create(dto);
    return { id: (reward._id as Types.ObjectId).toString() };
  }

  async getAllRewards(
    dto: GetAllRewardsRequestDto,
  ): Promise<GetAllRewardsResponseDto> {
    const { rewards, total, page, limit } =
      await this.rewardsRepository.findAll(dto);
    return {
      rewards: rewards.map(
        (r) =>
          new RewardDto({
            ...r,
            id: (r._id as Types.ObjectId).toString(),
          }),
      ),
      total,
      page,
      limit,
    };
  }

  async getRewardById(
    dto: GetRewardByIdRequestDto,
  ): Promise<GetRewardByIdResponseDto> {
    const reward = await this.rewardsRepository.findById(dto.id);
    return {
      reward: new RewardDto({
        ...reward,
        id: (reward._id as Types.ObjectId).toString(),
      }),
    };
  }

  async updateReward(
    dto: UpdateRewardRequestDto,
  ): Promise<UpdateRewardResponseDto> {
    const reward = await this.rewardsRepository.update(dto);
    return {
      reward: new RewardDto({
        ...reward,
        id: (reward._id as Types.ObjectId).toString(),
      }),
    };
  }

  async deleteReward(
    dto: DeleteRewardRequestDto,
  ): Promise<DeleteRewardResponseDto> {
    await this.rewardsRepository.softDelete(dto.id);
    return { success: true };
  }
}
