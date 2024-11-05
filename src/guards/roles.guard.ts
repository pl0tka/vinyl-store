import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum.js';
import { ROLES_KEY } from './roles.decorator.js';
import { ERROR_MESSAGES } from '../common/constants/constants.js';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this._reflector.get<Role[]>(
            ROLES_KEY,
            context.getHandler()
        );
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        if (
            !user?.roles ||
            !requiredRoles.some((role) => user.roles.includes(role))
        ) {
            throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN);
        }

        return true;
    }
}
