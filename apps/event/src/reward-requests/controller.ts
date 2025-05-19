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
} from "@/common/dto/requests.dto";
import { Controller, OnModuleInit } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { RewardRequestsService } from "./service";

@Controller()
export class RewardRequestsController implements OnModuleInit {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  onModuleInit() {
    console.log("🚀 [RewardRequestsController] gRPC Initialized");
  }

  @GrpcMethod("RewardRequestsService", "RequestReward")
  requestReward(
    data: RequestRewardRequestDto,
  ): Promise<RequestRewardResponseDto> {
    return this.rewardRequestsService.requestReward(data);
  }

  @GrpcMethod("RewardRequestsService", "GetMyRewardRequests")
  getMyRewardRequests(
    data: GetMyRewardRequestsRequestDto,
  ): Promise<GetMyRewardRequestsResponseDto> {
    return this.rewardRequestsService.getMyRewardRequests(data);
  }

  @GrpcMethod("RewardRequestsService", "GetAllRewardRequests")
  getAllRewardRequests(
    data: GetAllRewardRequestsRequestDto,
  ): Promise<GetAllRewardRequestsResponseDto> {
    return this.rewardRequestsService.getAllRewardRequests(data);
  }

  @GrpcMethod("RewardRequestsService", "GetRewardRequestById")
  getRewardRequestById(
    data: GetRewardRequestByIdRequestDto,
  ): Promise<GetRewardRequestByIdResponseDto> {
    return this.rewardRequestsService.getRewardRequestById(data);
  }

  @GrpcMethod("RewardRequestsService", "GetRewardAuditLog")
  getRewardAuditLog(
    data: GetRewardAuditLogRequestDto,
  ): Promise<GetRewardAuditLogResponseDto> {
    return this.rewardRequestsService.getRewardAuditLog(data);
  }
}
