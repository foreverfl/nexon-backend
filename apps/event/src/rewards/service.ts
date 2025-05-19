import {
  CreateRewardRequestDto,
  CreateRewardResponseDto,
} from "@/common/dto/requests.dto";
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
}
