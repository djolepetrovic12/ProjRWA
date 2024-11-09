import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector : Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    // Get the authenticated user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.includes(user?.role)) {
      throw new UnauthorizedException('You do not have permission to access this resource');
    }

    return true;

  }








  
}
