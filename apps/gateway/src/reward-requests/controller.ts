import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import {
  GetAllRewardRequestsRequestDto,
  RequestRewardRequestDto,
} from "@/reward-requests/requests.dto";
import { RewardRequestsService } from "@/reward-requests/service";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("reward-requests")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("reward-requests")
export class RewardsRequestsController {
  constructor(private readonly rewardsService: RewardRequestsService) {}

  @Post()
  @Roles("USER")
  @ApiOperation({ summary: "보상 요청 (유저)" })
  requestReward(@Body() dto: RequestRewardRequestDto) {
    return this.rewardsService.requestReward(dto);
  }

  @Get("mine")
  @Roles("USER")
  @ApiOperation({ summary: "내 보상 요청 이력 조회 (유저)" })
  getMyRequests(@Query("userId") userId: string) {
    return this.rewardsService.getMyRewardRequests(userId);
  }

  @Get()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "전체 보상 요청 목록 조회 (운영자)" })
  getAllRewardRequests(@Query() query: GetAllRewardRequestsRequestDto) {
    return this.rewardsService.getAllRewardRequests(query);
  }

  @Get(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 요청 상세 조회 (운영자)" })
  getRewardRequestById(@Param("id") id: string) {
    return this.rewardsService.getRewardRequestById(id);
  }
}
