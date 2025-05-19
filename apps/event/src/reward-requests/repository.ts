import {
  GetAllRewardRequestsRequestDto,
  RequestRewardRequestDto,
} from "@/common/dto/requests.dto";
import {
  RewardRequest,
  RewardRequestDocument,
} from "@/common/schema/reward-requests.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class RewardRequestsRepository {
  constructor(
    @InjectModel(RewardRequest.name)
    private readonly model: Model<RewardRequestDocument>,
  ) {}

  async create(dto: RequestRewardRequestDto): Promise<RewardRequestDocument> {
    return this.model.create({ ...dto });
  }

  async findByUserId(userId: string) {
    return this.model
      .find({ userId: new Types.ObjectId(userId), del_yn: false })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id: string) {
    return this.model.findById(id).orFail().lean();
  }

  async findAll() {
    return this.model.find({ del_yn: false }).lean();
  }

  async findAllPaginated(dto: GetAllRewardRequestsRequestDto) {
    const { page = 1, limit = 10 } = dto;
    const query = { del_yn: false };
    const results = await this.model
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    const total = await this.model.countDocuments(query);
    return { results, total, page, limit };
  }
}
