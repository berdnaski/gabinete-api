import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { SecurityModule } from './core/security/security.module';
import { AuthModule } from './core/auth/auth.module';

import { CabinetsModule } from './modules/cabinets/cabinets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SecurityModule,
    CabinetsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
