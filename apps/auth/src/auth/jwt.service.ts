import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = 'my-secret-key'; // TODO: 환경변수로 분리하기

  sign(payload: any) {
    const accessToken = jwt.sign(payload, this.secret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, this.secret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
