import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PaginatedResultDto } from 'src/shared/pagination/paginated-result.dto';

@Injectable()
export class ListUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(cabinetId: string, params: PaginationParamsDto): Promise<PaginatedResultDto<UserResponseDto>> {
        const result = await this.userRepository.list(cabinetId, params);

        return new PaginatedResultDto(
            result.items.map(user => UserResponseDto.fromEntity(user)),
            result.total,
            result.page,
            result.limit
        );
    }
}
