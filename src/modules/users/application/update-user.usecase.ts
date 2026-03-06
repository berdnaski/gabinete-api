import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string, cabinetId: string, dto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(id, cabinetId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const updated = await this.userRepository.update(id, cabinetId, dto);
        return UserResponseDto.fromEntity(updated);
    }
}
