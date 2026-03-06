import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @ApiPropertyOptional({ example: 'Saúde Atualizada' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}