import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtModule } from './jwt/auth-jwt.module';
import { UsersModule } from 'src/modules/users/users.module';

import { CabinetsModule } from 'src/modules/cabinets/cabinets.module';
import { SecurityModule } from 'src/core/security/security.module';

@Module({
    imports: [
        AuthJwtModule,
        UsersModule,
        CabinetsModule,
        SecurityModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
