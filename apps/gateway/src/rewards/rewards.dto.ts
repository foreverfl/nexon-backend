import { Expose, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from "class-validator";

export class RewardDto {
  constructor(partial: Partial<RewardDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  type: string; // "ITEM", "POINT", "MESO", "TITLE", "EXP"

  @Expose()
  @IsOptional()
  @IsInt()
  itemId?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  value?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  duration?: number;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsBoolean()
  isDeleted: boolean;
}

// 보상 등록 (운영자)
export class CreateRewardRequestDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  itemId?: number;

  @IsOptional()
  @IsInt()
  value?: number;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateRewardResponseDto {
  @IsString()
  id: string;
}

// 전체 보상 목록 (운영자)
export class GetAllRewardsRequestDto {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}

// 보상 상세 조회 (운영자)
export class GetAllRewardsResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RewardDto)
  rewards: RewardDto[];

  @IsInt()
  total: number;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;
}

// 보상 상세 조회 (운영자)
export class GetRewardByIdRequestDto {
  @IsString()
  id: string;
}

export class GetRewardByIdResponseDto {
  @ValidateNested()
  @Type(() => RewardDto)
  reward: RewardDto;
}

// 보상 수정 (운영자)
export class UpdateRewardRequestDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  itemId?: number;

  @IsOptional()
  @IsInt()
  value?: number;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRewardResponseDto {
  @ValidateNested()
  @Type(() => RewardDto)
  reward: RewardDto;
}

// 보상 삭제 (운영자)
export class DeleteRewardRequestDto {
  @IsString()
  id: string;
}

export class DeleteRewardResponseDto {
  @IsBoolean()
  success: boolean;
}
