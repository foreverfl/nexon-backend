import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import { EventsService } from "@/events/service";
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

@ApiTags("events")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 이벤트 등록 (운영자)
  @Post()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 등록 (운영자)" })
  createEvent() {
    return { message: "이벤트 등록 (stub)" };
  }

  // 이벤트 목록 (운영자)
  @Get()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "전체 이벤트 목록 조회 (운영자)" })
  getAllEventsAdmin() {
    return { message: "이벤트 전체 목록 (stub)" };
  }

  // 이벤트 상세 (운영자)
  @Get(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 상세 조회 (운영자)" })
  getEventByIdAdmin(@Param("id") id: string) {
    return { message: `이벤트 상세 조회 (stub) for ID: ${id}` };
  }

  // 이벤트 수정 (운영자)
  @Put(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 수정 (운영자)" })
  updateEvent(@Param("id") id: string) {
    return { message: `이벤트 수정 (stub) for ID: ${id}` };
  }

  // 이벤트 삭제 (운영자)
  @Delete(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 삭제 (운영자)" })
  deleteEvent(@Param("id") id: string) {
    return { message: `이벤트 삭제 (stub) for ID: ${id}` };
  }

  // 공개 이벤트 목록 (유저)
  @Get("public")
  @Roles("USER")
  @ApiOperation({ summary: "활성 이벤트 목록 조회 (유저)" })
  getActiveEvents() {
    return { message: "유저용 활성 이벤트 목록 (stub)" };
  }

  // 이벤트 상세 (유저)
  @Get("public/:id")
  @Roles("USER")
  @ApiOperation({ summary: "활성 이벤트 상세 조회 (유저)" })
  getActiveEventById(@Param("id") id: string) {
    return { message: `유저용 이벤트 상세 조회 (stub) for ID: ${id}` };
  }
}
