import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const JwtGuardBase = AuthGuard('jwt');

@Injectable()
export class JwtAuthGuard extends JwtGuardBase {}
