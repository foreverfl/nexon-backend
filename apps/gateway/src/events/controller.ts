import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { EventsService } from "@/events/service";
import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags("events")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 📌 USER (유저)
  @Get("public")
  @Roles("USER")
  getActiveEvents() {
    return { message: "활성 이벤트 목록 조회 (stub)" };
  }

  @Get("public/:eventId")
  getActiveEventById(@Param("eventId") eventId: string) {
    return { message: `활성 이벤트 상세 조회 (stub) for ID: ${eventId}` };
  }

  @Get("public/:eventId/rewards")
  getEventRewards(@Param("eventId") eventId: string) {
    return { message: `이벤트 보상 목록 조회 (stub) for Event ID: ${eventId}` };
  }

  @Post("public/:eventId/rewards/request")
  requestReward(@Param("eventId") eventId: string) {
    return { message: `유저 보상 요청 (stub) for Event ID: ${eventId}` };
  }

  // 이벤트 등록 및 조회 (운영자)
  @Post()
  @Roles("OPERATOR")
  createEvent() {
    return { message: "이벤트 생성 (stub)" };
  }

  @Get()
  @Roles("OPERATOR")
  getAllEventsAdmin() {
    return { message: "운영자용 전체 이벤트 목록 조회 (stub)" };
  }

  @Get(":eventId")
  getEventByIdAdmin(@Param("eventId") eventId: string) {
    return { message: `운영자용 이벤트 상세 조회 (stub) for ID: ${eventId}` };
  }
}
