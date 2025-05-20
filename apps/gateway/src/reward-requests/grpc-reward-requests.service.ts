import {
  GetAllRewardRequestsRequestDto,
  GetAllRewardRequestsResponseDto,
  GetMyRewardRequestsRequestDto,
  GetMyRewardRequestsResponseDto,
  GetRewardRequestByIdRequestDto,
  GetRewardRequestByIdResponseDto,
  RequestRewardRequestDto,
  RequestRewardResponseDto,
} from "@/reward-requests/requests.dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

interface GrpcRewardRequestsServiceClient {
  RequestReward(
    data: RequestRewardRequestDto,
  ): Observable<RequestRewardResponseDto>;
  GetMyRewardRequests(
    data: GetMyRewardRequestsRequestDto,
  ): Observable<GetMyRewardRequestsResponseDto>;
  GetAllRewardRequests(
    data: GetAllRewardRequestsRequestDto,
  ): Observable<GetAllRewardRequestsResponseDto>;
  GetRewardRequestById(
    data: GetRewardRequestByIdRequestDto,
  ): Observable<GetRewardRequestByIdResponseDto>;
}

@Injectable()
export class GrpcRewardRequestsService implements OnModuleInit {
  private grpcClient: GrpcRewardRequestsServiceClient;

  constructor(@Inject("REWARD_REQUESTS") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcClient = this.client.getService<GrpcRewardRequestsServiceClient>(
      "RewardRequestsService",
    );
  }

  requestReward(data: RequestRewardRequestDto) {
    return lastValueFrom(this.grpcClient.RequestReward(data));
  }

  getMyRewardRequests(data: GetMyRewardRequestsRequestDto) {
    return lastValueFrom(this.grpcClient.GetMyRewardRequests(data));
  }

  getAllRewardRequests(data: GetAllRewardRequestsRequestDto) {
    return lastValueFrom(this.grpcClient.GetAllRewardRequests(data));
  }

  getRewardRequestById(data: GetRewardRequestByIdRequestDto) {
    return lastValueFrom(this.grpcClient.GetRewardRequestById(data));
  }
}
