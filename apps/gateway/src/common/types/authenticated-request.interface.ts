import { Request } from "express";
import { ValidateResponseDto } from "@/common/dto/auth.dto";

export interface AuthenticatedRequest extends Request {
  user: ValidateResponseDto;
}
