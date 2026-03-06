import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserPayload } from './current-user.decorator';

export const CurrentTenantId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as AuthUserPayload;
        return user.cabinetId;
    },
);
