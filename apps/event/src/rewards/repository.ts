import { CreateRewardRequestDto } from "@/common/dto/requests.dto";
import { Reward, RewardDocument } from "@/common/schema/rewards.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RewardsRepository {
  constructor(
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<RewardDocument>,
  ) {}

  async create(dto: CreateRewardRequestDto): Promise<RewardDocument> {
    const reward = new this.rewardModel({
      ...dto,
      del_yn: false,
    });
    return reward.save();
  }
}
