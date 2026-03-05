import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class FindUserByEmailUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}
