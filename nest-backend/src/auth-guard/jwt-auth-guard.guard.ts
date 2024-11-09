import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService)
  {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const request = context.switchToHttp().getRequest();


    //const token = this.extractTokenFromHeader(request);

    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No access token found');
    }

    try {
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });


      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }


}
