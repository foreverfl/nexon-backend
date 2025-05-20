import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import {
  CreateRewardRequestDto,
  UpdateRewardRequestDto,
} from "@/rewards/rewards.dto";
import { RewardsService } from "@/rewards/service";
import {
  Body,
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

  @Post()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 등록 (운영자)" })
  registerReward(@Body() dto: CreateRewardRequestDto) {
    return this.rewardsService.createReward(dto);
  }

  @Get()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 목록 조회 (운영자)" })
  getAllRewards() {
    return this.rewardsService.getAllRewards({});
  }

  @Get(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 상세 조회 (운영자)" })
  getRewardById(@Param("id") id: string) {
    return this.rewardsService.getRewardById({ id });
  }

  @Put(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 수정 (운영자)" })
  updateReward(@Param("id") id: string, @Body() dto: UpdateRewardRequestDto) {
    return this.rewardsService.updateReward({ ...dto, id });
  }

  @Delete(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "보상 삭제 (운영자)" })
  deleteReward(@Param("id") id: string) {
    return this.rewardsService.deleteReward({ id });
  }
}
