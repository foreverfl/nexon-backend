// events.dto.ts
import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

// ===== 공통 Event DTO =====

export class EventDto {
  constructor(partial: Partial<EventDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Expose()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsBoolean()
  isDeleted: boolean;

  @Expose()
  @IsOptional()
  @IsInt()
  minLevel?: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  region?: string[];

  @Expose()
  @IsOptional()
  @IsString()
  worldType?: string;

  @Expose()
  @IsOptional()
  @IsString()
  platform?: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Expose()
  @IsString()
  createdBy: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  rewardIds: string[];
}

// 이벤트 등록 (운영자)
export class CreateEventRequestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  createdBy: string;

  @IsOptional()
  @IsInt()
  minLevel?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  region?: string[];

  @IsOptional()
  @IsString()
  worldType?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsArray()
  @IsString({ each: true })
  rewardIds: string[];
}

export class CreateEventResponseDto {
  @IsString()
  id: string;
}

// 이벤트 목록 (운영자)
export class GetAllEventsRequestDto {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}

export class GetAllEventsResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events: EventDto[];

  @IsInt()
  total: number;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;
}

// 이벤트 상세 (운영자)
export class GetEventByIdRequestDto {
  @IsString()
  id: string;
}

export class GetEventByIdResponseDto {
  @ValidateNested()
  @Type(() => EventDto)
  event: EventDto;
}

// 이벤트 수정 (운영자)
export class UpdateEventRequestDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  createdBy: string;

  @IsOptional()
  @IsInt()
  minLevel?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  region?: string[];

  @IsOptional()
  @IsString()
  worldType?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsArray()
  @IsString({ each: true })
  rewardIds: string[];
}
export class UpdateEventResponseDto {
  @ValidateNested()
  @Type(() => EventDto)
  event: EventDto;
}

// 이벤트 삭제제
export class DeleteEventRequestDto {
  @IsString()
  id: string;
}

export class DeleteEventResponseDto {
  @IsBoolean()
  success: boolean;
}
