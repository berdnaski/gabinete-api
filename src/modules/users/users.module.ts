import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserRepository } from './infrastructure/user.repository.impl';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { CreateUserUseCase } from './application/create-user.usecase';

@Module({
    providers: [
        { provide: USER_REPOSITORY, useClass: UserRepository },
        FindUserByEmailUseCase,
        CreateUserUseCase,
    ],
    exports: [FindUserByEmailUseCase, CreateUserUseCase],
})
export class UsersModule { }
