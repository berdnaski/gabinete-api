import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { DemandPriority } from '@prisma/client';

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

    @ApiPropertyOptional({ enum: DemandPriority, default: DemandPriority.LOW })
    @IsEnum(DemandPriority)
    @IsOptional()
    priority?: DemandPriority;

    @ApiPropertyOptional({ example: -23.55052 })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiPropertyOptional({ example: -46.633308 })
    @Type(() => Number)
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
