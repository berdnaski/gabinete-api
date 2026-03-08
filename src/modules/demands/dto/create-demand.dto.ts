import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDemandDto {
    @ApiProperty({ example: 'Buraco na rua' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Um buraco enorme na frente da minha casa' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'uuid-da-categoria' })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @ApiPropertyOptional({ example: -23.55052 })
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiPropertyOptional({ example: -46.633308 })
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiPropertyOptional({ example: 'Rua Augusta, 123' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ example: 'ChIJP30dUqZZzpQR7Mprev0s7hM' })
    @IsString()
    @IsOptional()
    googlePlaceId?: string;
}
