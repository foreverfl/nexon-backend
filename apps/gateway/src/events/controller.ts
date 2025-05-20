import { Roles } from "@/common/decorator/roles.decorator";
import { JwtAuthGuard } from "@/common/guard/jwt-auth.guard";
import { RolesGuard } from "@/common/guard/roles.guard";
import {
  CreateEventRequestDto,
  GetAllEventsRequestDto,
  UpdateEventRequestDto,
} from "@/events/events.dto";
import { EventsService } from "@/events/service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("events")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 등록 (운영자)" })
  createEvent(@Body() dto: CreateEventRequestDto) {
    return this.eventsService.createEvent(dto);
  }

  @Get()
  @Roles("OPERATOR")
  @ApiOperation({ summary: "전체 이벤트 목록 조회 (운영자)" })
  getAllEventsAdmin(@Query() query: GetAllEventsRequestDto) {
    return this.eventsService.getAllEvents(query);
  }

  @Get(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 상세 조회 (운영자)" })
  getEventByIdAdmin(@Param("id") id: string) {
    return this.eventsService.getEventById(id);
  }

  @Put(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 수정 (운영자)" })
  updateEvent(@Param("id") id: string, @Body() dto: UpdateEventRequestDto) {
    return this.eventsService.updateEvent(id, dto);
  }

  @Delete(":id")
  @Roles("OPERATOR")
  @ApiOperation({ summary: "이벤트 삭제 (운영자)" })
  deleteEvent(@Param("id") id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
