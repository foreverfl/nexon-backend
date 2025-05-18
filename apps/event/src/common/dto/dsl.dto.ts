import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DslRuleDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  count?: number;
}

class DslRewardDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsInt()
  value?: number;

  @IsOptional()
  @IsString()
  code?: string;
}

class DslConditionDto {
  @IsOptional()
  @IsString()
  userLevel?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  region?: string[];
}

export class DslDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DslRuleDto)
  rules: DslRuleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DslRewardDto)
  rewards: DslRewardDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DslConditionDto)
  conditions?: DslConditionDto;
}