import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string, cabinetId: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(id, cabinetId);
        if (!user) {
            throw new NotFoundException('User not found in this cabinet');
        }
        return UserResponseDto.fromEntity(user);
    }
}
