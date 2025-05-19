import { Request } from "express";
import { ValidateResponseDto } from "@/auth/auth.dto";

export interface AuthenticatedRequest extends Request {
  user: ValidateResponseDto;
}
