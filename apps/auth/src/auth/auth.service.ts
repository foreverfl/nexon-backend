import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './auth.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginRequestDto) {
    // TODO: 실제 DB 조회 대신 하드코딩된 유저
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '1234', // TODO: 실제로는 해싱된 비밀번호
      role: 'USER',
    };

    // TODO: 비밀번호 비교 생략 (검증 로직 없음)
    if (dto.email !== mockUser.email || dto.password !== mockUser.password) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    };

    const tokens = this.jwtService.sign(payload);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
