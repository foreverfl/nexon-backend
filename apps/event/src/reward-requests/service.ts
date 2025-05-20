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
import { EventsRepository } from "@/events/repository";
import { RewardsRepository } from "@/rewards/repository";
import { status } from "@grpc/grpc-js";
import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { RewardRequestsRepository } from "./repository";

@Injectable()
export class RewardRequestsService {
  constructor(
    private readonly rewardRequestsRepository: RewardRequestsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly rewardsRepository: RewardsRepository,
  ) {}

  async requestReward(
    dto: RequestRewardRequestDto,
  ): Promise<RequestRewardResponseDto> {
    // ID 유효성 검사
    // eventId 존재 여부 확인
    const event = await this.eventsRepository
      .findById(dto.eventId)
      .catch(() => null);
    if (!event) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "존재하지 않는 이벤트입니다.",
      });
    }

    // rewardId 존재 여부 확인
    const reward = await this.rewardsRepository
      .findById(dto.rewardId)
      .catch(() => null);
    if (!reward) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: "존재하지 않는 보상입니다.",
      });
    }

    // userId 존재 여부 확인
    // TODO: authService.validateUser(dto.userId) 추가 예정

    // 보상 요청 중복 체크
    const isPending =
      await this.rewardRequestsRepository.existsPendingRequest(dto);

    if (isPending) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: "이미 보상을 요청하였습니다.",
      });
    }

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
