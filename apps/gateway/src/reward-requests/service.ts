import { GrpcRewardRequestsService } from "@/reward-requests/grpc-reward-requests.service";
import {
  GetAllRewardRequestsRequestDto,
  RequestRewardRequestDto,
} from "@/reward-requests/requests.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RewardRequestsService {
  constructor(private readonly grpc: GrpcRewardRequestsService) {}

  requestReward(dto: RequestRewardRequestDto) {
    return this.grpc.requestReward(dto);
  }

  getMyRewardRequests(userId: string) {
    return this.grpc.getMyRewardRequests({ userId });
  }

  getAllRewardRequests(dto: GetAllRewardRequestsRequestDto) {
    return this.grpc.getAllRewardRequests(dto);
  }

  getRewardRequestById(id: string) {
    return this.grpc.getRewardRequestById({ id });
  }
}
