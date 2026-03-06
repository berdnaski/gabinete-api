import { Module } from '@nestjs/common';
import { UserRepository } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { CreateUserUseCase } from './application/create-user.usecase';

import { UsersController } from './users.controller';
import { ListUsersUseCase } from './application/list-users.usecase';
import { FindUserByIdUseCase } from './application/find-user-by-id.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserUseCase } from './application/delete-user.usecase';

@Module({
    controllers: [UsersController],
    providers: [
        { provide: UserRepository, useClass: UserRepositoryImpl },
        FindUserByEmailUseCase,
        CreateUserUseCase,
        ListUsersUseCase,
        FindUserByIdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
    ],
    exports: [
        UserRepository,
        FindUserByEmailUseCase,
        CreateUserUseCase,
        ListUsersUseCase,
        FindUserByIdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
    ],
})
export class UsersModule { }
