import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../domain/user.repository';
import { PasswordHasher } from 'src/core/security/password-hasher';
import { User } from '../domain/user.entity';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) { }

    async execute(data: { name: string; email: string; password: string }): Promise<User> {
        const hashedPassword = await this.passwordHasher.hash(data.password);
        return this.userRepository.create({ ...data, password: hashedPassword });
    }
}
