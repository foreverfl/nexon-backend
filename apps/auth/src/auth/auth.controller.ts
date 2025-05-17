import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  login(data: { email: string; password: string }) {
    console.log('🚀 Login called:', data);
    return {
      accessToken: '123',
      refreshToken: '456',
    };
  }
}
