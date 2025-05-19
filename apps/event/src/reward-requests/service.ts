import {
  GetAllRewardRequestsRequestDto,
  GetAllRewardRequestsResponseDto,
  GetMyRewardRequestsRequestDto,
  GetMyRewardRequestsResponseDto,
  GetRewardRequestByIdRequestDto,
  GetRewardRequestByIdResponseDto,
  RequestRewardRequestDto,
  RequestRewardResponseDto,
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
    // TODO: 유효성 검증 로직 구현

    // TODO: 보상 요청 중복 체크 로직 구현 (redis)

    // 보상 요청
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
            eventId: r.eventId.toString(),
            rewardId: r.rewardId.toString(),
            status: r.status,
            fulfilledAt: r.fulfilledAt?.toISOString() ?? "",
            comment: r.comment ?? "",
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
        eventId: request.eventId.toString(),
        rewardId: request.rewardId.toString(),
        status: request.status,
        fulfilledAt: request.fulfilledAt?.toISOString() ?? "",
        comment: request.comment ?? "",
      }),
    };
  }
}
