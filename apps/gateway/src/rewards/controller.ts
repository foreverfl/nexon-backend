import { Controller, Get, Post } from "@nestjs/common";
import { RewardsService } from "@/rewards/service";

@Controller("rewards")
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // 📌 USER
  @Get("requests/mine")
  getMyRewardRequests() {
    return { message: "내 보상 요청 내역 조회 (stub)" };
  }

  // 📌 OPERATOR
  @Post()
  registerReward() {
    return { message: "보상 등록 (stub)" };
  }

  @Get()
  getAllRewards() {
    return { message: "전체 보상 목록 조회 (stub)" };
  }

  @Get("requests")
  getAllRewardRequests() {
    return { message: "전체 유저 보상 요청 내역 조회 (stub)" };
  }

  // 📌 AUDITOR
  @Get("audit")
  getRewardAuditLog() {
    return { message: "보상 지급 이력 감사 조회 (stub)" };
  }
}
