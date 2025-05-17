import { IsEmail, IsString } from "class-validator";

export class RegisterRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}

export class RegisterResponseDto {
  userId: string;
  email: string;
  role: string;
}
