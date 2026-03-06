import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string, cabinetId: string): Promise<void> {
        const user = await this.userRepository.findById(id, cabinetId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.delete(id, cabinetId);
    }
}
