import {
  RequestRewardRequestDto,
  RequestRewardResponseDto,
  GetMyRewardRequestsRequestDto,
  GetMyRewardRequestsResponseDto,
  GetAllRewardRequestsRequestDto,
  GetAllRewardRequestsResponseDto,
  GetRewardRequestByIdRequestDto,
  GetRewardRequestByIdResponseDto,
  GetRewardAuditLogRequestDto,
  GetRewardAuditLogResponseDto,
  RewardRequestDto,
} from "@/common/dto/requests.dto";
import { Injectable } from "@nestjs/common";
import { RewardRequestsRepository } from "./repository";

@Injectable()
export class RewardRequestsService {
  constructor(
    private readonly rewardRequestsRepository: RewardRequestsRepository,
  ) {}

  async requestReward(
    dto: RequestRewardRequestDto,
  ): Promise<RequestRewardResponseDto> {
    const request = await this.rewardRequestsRepository.create(dto);
    return { id: request._id.toString() };
  }

  async getMyRewardRequests(
    dto: GetMyRewardRequestsRequestDto,
  ): Promise<GetMyRewardRequestsResponseDto> {
    const requests = await this.rewardRequestsRepository.findByUserId(
      dto.userId,
    );
    return {
      requests: requests.map(
        (r) =>
          new RewardRequestDto({
            id: r._id.toString(),
            userId: r.userId.toString(),
            rewardId: r.rewardId.toString(),
            fulfilledAt: r.fulfilledAt?.toISOString(),
          }),
      ),
    };
  }

  async getAllRewardRequests(
    dto: GetAllRewardRequestsRequestDto,
  ): Promise<GetAllRewardRequestsResponseDto> {
    const { results, total, page, limit } =
      await this.rewardRequestsRepository.findAllPaginated(dto);
    return {
      requests: results.map(
        (r) =>
          new RewardRequestDto({
            id: r._id.toString(),
            userId: r.userId.toString(),
            rewardId: r.rewardId.toString(),
            fulfilledAt: r.fulfilledAt?.toISOString(),
          }),
      ),
      total,
      page,
      limit,
    };
  }

  async getRewardRequestById(
    dto: GetRewardRequestByIdRequestDto,
  ): Promise<GetRewardRequestByIdResponseDto> {
    const request = await this.rewardRequestsRepository.findById(dto.id);
    return {
      request: new RewardRequestDto({
        id: request._id.toString(),
        userId: request.userId.toString(),
        rewardId: request.rewardId.toString(),
        fulfilledAt: request.fulfilledAt?.toISOString(),
      }),
    };
  }

  async getRewardAuditLog(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _dto: GetRewardAuditLogRequestDto,
  ): Promise<GetRewardAuditLogResponseDto> {
    const logs = await this.rewardRequestsRepository.findAll(); // or findAuditLogs()
    return {
      logs: logs.map(
        (r) =>
          new RewardRequestDto({
            id: r._id.toString(),
            userId: r.userId.toString(),
            rewardId: r.rewardId.toString(),
            fulfilledAt: r.fulfilledAt?.toISOString(),
          }),
      ),
    };
  }
}
