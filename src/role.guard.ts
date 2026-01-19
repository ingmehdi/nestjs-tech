import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(["admin"], context.getHandler());
    if (!roles) {
      throw new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.roles);
  }

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    return allowedRoles.some((role) => userRoles.includes(role));
  }
}
