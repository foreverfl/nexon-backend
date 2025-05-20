import {
  CreateRewardRequestDto,
  GetRewardByIdRequestDto,
  UpdateRewardRequestDto,
  DeleteRewardRequestDto,
  GetAllRewardsRequestDto,
  RewardDto,
} from "@/rewards/rewards.dto";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom, Observable } from "rxjs";

interface GrpcRewardsServiceClient {
  CreateReward(data: CreateRewardRequestDto): Observable<RewardDto>;
  GetAllRewards(
    data: GetAllRewardsRequestDto,
  ): Observable<{ rewards: RewardDto[] }>;
  GetRewardById(data: GetRewardByIdRequestDto): Observable<RewardDto>;
  UpdateReward(data: UpdateRewardRequestDto): Observable<RewardDto>;
  DeleteReward(data: DeleteRewardRequestDto): Observable<{ success: boolean }>;
}

@Injectable()
export class GrpcRewardsService implements OnModuleInit {
  private grpcRewardsService: GrpcRewardsServiceClient;

  constructor(@Inject("REWARDS") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcRewardsService =
      this.client.getService<GrpcRewardsServiceClient>("RewardsService");
  }

  async createReward(data: CreateRewardRequestDto) {
    return lastValueFrom(this.grpcRewardsService.CreateReward(data));
  }

  async getAllRewards(data: GetAllRewardsRequestDto) {
    return lastValueFrom(this.grpcRewardsService.GetAllRewards(data));
  }

  async getRewardById(data: GetRewardByIdRequestDto) {
    return lastValueFrom(this.grpcRewardsService.GetRewardById(data));
  }

  async updateReward(data: UpdateRewardRequestDto) {
    return lastValueFrom(this.grpcRewardsService.UpdateReward(data));
  }

  async deleteReward(data: DeleteRewardRequestDto) {
    return lastValueFrom(this.grpcRewardsService.DeleteReward(data));
  }
}
