import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { RewardRequestsService } from "@/reward-requests/service";
import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("reward-requests")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("rewards/requests")
export class RewardsRequestsController {
  constructor(private readonly rewardsService: RewardRequestsService) {}

  // 유저 보상 요청 (유저)
  @Post("requests")
  @Roles("USER")
  @ApiOperation({ summary: "보상 요청 (유저)" })
  requestReward() {
    return { message: "보상 요청 (stub)" };
  }

  // 내 보상 요청 조회 (유저)
  @Get("requests/mine")
  @Roles("USER")
  @ApiOperation({ summary: "내 보상 요청 이력 조회 (유저)" })
  getMyRequests() {
    return { message: "내 보상 요청 이력 (stub)" };
  }

  // 전체 요청 목록 (운영자)
  @Get("requests")
  @Roles("USER")
  @ApiOperation({ summary: "전체 보상 요청 목록 조회 (운영자)" })
  getAllRewardRequests() {
    return { message: "전체 보상 요청 목록 (stub)" };
  }

  // 보상 요청 단건 상세 (운영자)
  @Get("requests/:id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 요청 상세 조회 (운영자)" })
  getRewardRequestById(@Param("id") id: string) {
    return { message: `보상 요청 상세 조회 (stub) for ID: ${id}` };
  }

  // 감사 로그 (감사자)
  @Get("audit")
  @Roles("AUDITOR")
  @ApiOperation({ summary: "보상 감사 로그 조회 (감사자)" })
  getRewardAuditLog() {
    return { message: "감사 로그 조회 (stub)" };
  }
}
