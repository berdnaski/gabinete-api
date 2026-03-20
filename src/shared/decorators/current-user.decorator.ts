import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '@prisma/client';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: Role;
  cabinetId: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserPayload => {
    const request = ctx.switchToHttp().getRequest<Request & { user: AuthUserPayload }>();
    return request.user;
  },
);
