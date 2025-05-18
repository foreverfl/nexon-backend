import { Controller, Get, Param, Post } from "@nestjs/common";
import { EventsService } from "@/events/service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 📌 USER (유저)
  @Get("public")
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

  // 📌 OPERATOR (운영자)
  @Post()
  createEvent() {
    return { message: "이벤트 생성 (stub)" };
  }

  @Get()
  getAllEventsAdmin() {
    return { message: "운영자용 전체 이벤트 목록 조회 (stub)" };
  }

  @Get(":eventId")
  getEventByIdAdmin(@Param("eventId") eventId: string) {
    return { message: `운영자용 이벤트 상세 조회 (stub) for ID: ${eventId}` };
  }
}
