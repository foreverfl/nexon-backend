import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

// 모델
export class RewardRequestDto {
  constructor(partial: Partial<RewardRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  userId: string;

  @Expose()
  @IsString()
  eventId: string;

  @Expose()
  @IsString()
  rewardId: string;

  @Expose()
  @IsEnum(["PENDING", "APPROVED", "REJECTED"])
  status: "PENDING" | "APPROVED" | "REJECTED";

  @Expose()
  @IsOptional()
  @IsDateString()
  fulfilledAt?: string;

  @Expose()
  @IsOptional()
  @IsString()
  comment?: string;
}

// 보상 요청 (유저)
export class RequestRewardRequestDto {
  @IsString()
  userId: string;

  @IsString()
  eventId: string;

  @IsString()
  rewardId: string;
}

export class RequestRewardResponseDto {
  @IsString()
  id: string;
}

// 내 보상 요청 조회 (유저)
export class GetMyRewardRequestsRequestDto {
  @IsString()
  userId: string;
}

export class GetMyRewardRequestsResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RewardRequestDto)
  requests: RewardRequestDto[];
}

// 전체 보상 요청 목록 조회 (운영자)
export class GetAllRewardRequestsRequestDto {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}

export class GetAllRewardRequestsResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RewardRequestDto)
  requests: RewardRequestDto[];

  @IsInt()
  total: number;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;
}

// 보상 요청 단건 조회 (운영자)
export class GetRewardRequestByIdRequestDto {
  @IsString()
  id: string;
}

export class GetRewardRequestByIdResponseDto {
  @ValidateNested()
  @Type(() => RewardRequestDto)
  request: RewardRequestDto;
}

// 감사 로그 조회 (감사자)
export class GetRewardAuditLogRequestDto {}

export class GetRewardAuditLogResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RewardRequestDto)
  logs: RewardRequestDto[];
}
