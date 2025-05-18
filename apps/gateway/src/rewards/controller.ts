import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { RewardsService } from "@/rewards/service";
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("rewards")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("rewards")
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // 보상 등록 (운영자)
  @Post()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 등록 (운영자)" })
  registerReward() {
    return { message: "보상 등록 (stub)" };
  }

  // 전체 보상 목록 (운영자)
  @Get()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 목록 조회 (운영자)" })
  getAllRewards() {
    return { message: "보상 전체 목록 (stub)" };
  }

  // 보상 상세 조회 (운영자)
  @Get(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 상세 조회 (운영자)" })
  getRewardById(@Param("id") id: string) {
    return { message: `보상 상세 조회 (stub) for ID: ${id}` };
  }

  // 보상 수정 (운영자)
  @Put(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 수정 (운영자)" })
  updateReward(@Param("id") id: string) {
    return { message: `보상 수정 (stub) for ID: ${id}` };
  }

  // 보상 삭제 (운영자)
  @Delete(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 삭제 (운영자)" })
  deleteReward(@Param("id") id: string) {
    return { message: `보상 삭제 (stub) for ID: ${id}` };
  }
}
