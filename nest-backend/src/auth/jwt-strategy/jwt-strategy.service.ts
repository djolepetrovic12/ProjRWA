import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: (req) => req?.cookies?.['jwt'],
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (!payload) {
        throw new UnauthorizedException('Invalid JWT payload');
      }
    return {
      id: payload.id,
      role: payload.role,
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      username: payload.username,
    };
  }
}