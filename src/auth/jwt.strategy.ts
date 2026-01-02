import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret-key',
    });
  }

  async validate(payload: any) {
    // Debug: Log the payload to see what's in the token
    console.log('JWT Payload:', payload);
    
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user) {
      console.log('User not found with ID:', payload.sub);
      throw new UnauthorizedException();
    }

    return user;
  }
}
