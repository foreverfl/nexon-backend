import { ROLES_KEY } from "@/common/decorator/roles.decorator";
import { AuthenticatedRequest } from "@/common/types/authenticated-request.interface";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (user?.role === "ADMIN") return true;

    if (!requiredRoles) return true;

    return requiredRoles.includes(user.role);
  }
}
