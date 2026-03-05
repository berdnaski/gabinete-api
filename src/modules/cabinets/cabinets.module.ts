import { Module } from '@nestjs/common';
import { RegisterCabinetUseCase } from './application/register-cabinet.usecase';

@Module({
    providers: [RegisterCabinetUseCase],
    exports: [RegisterCabinetUseCase],
})
export class CabinetsModule { }
