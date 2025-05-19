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

export class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenRequestDto {
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export class ValidateRequestDto {
  @IsString()
  accessToken: string;
}

export class ValidateResponseDto {
  userId: string;
  role: string;
  valid: boolean;
}
