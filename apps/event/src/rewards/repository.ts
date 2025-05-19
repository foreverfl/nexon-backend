import {
  CreateRewardRequestDto,
  GetAllRewardsRequestDto,
  UpdateRewardRequestDto,
} from "@/common/dto/requests.dto";
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

  async findAll(dto: GetAllRewardsRequestDto) {
    const { page = 1, limit = 10 } = dto;
    const query = { del_yn: false };
    const rewards = await this.rewardModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await this.rewardModel.countDocuments(query);
    return { rewards, total, page, limit };
  }

  async findById(id: string) {
    return this.rewardModel.findById(id).orFail().lean();
  }

  async update(dto: UpdateRewardRequestDto) {
    const { id, ...updateData } = dto;
    return this.rewardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .orFail()
      .lean();
  }

  async softDelete(id: string) {
    await this.rewardModel.findByIdAndUpdate(id, { del_yn: true }).orFail();
  }
}
