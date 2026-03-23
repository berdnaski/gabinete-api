import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../domain/category.entity';

export class CategoryResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    static fromEntity(entity: Category): CategoryResponseDto {
        return {
            id: entity.id,
            name: entity.name,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}