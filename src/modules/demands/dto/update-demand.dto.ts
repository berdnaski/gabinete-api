import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDemandDto {
    @ApiPropertyOptional({ example: 'Buraco na rua (Atualizado)' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: 'Descrição atualizada sobre o buraco.' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 'uuid-da-categoria' })
    @IsUUID()
    @IsOptional()
    categoryId?: string;

    @ApiPropertyOptional({ example: -23.55052 })
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiPropertyOptional({ example: -46.633308 })
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiPropertyOptional({ example: 'Avenida Paulista, 1000' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ example: 'ChIJP30dUqZZzpQR7Mprev0s7hM' })
    @IsString()
    @IsOptional()
    googlePlaceId?: string;
}
