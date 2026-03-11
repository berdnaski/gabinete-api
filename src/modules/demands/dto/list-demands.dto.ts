import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { DemandStatus, DemandPriority } from '@prisma/client';

export class ListDemandsDto extends PaginationParamsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ enum: DemandStatus })
    @IsEnum(DemandStatus)
    @IsOptional()
    status?: DemandStatus;

    @ApiPropertyOptional({ enum: DemandPriority })
    @IsEnum(DemandPriority)
    @IsOptional()
    priority?: DemandPriority;

    @ApiPropertyOptional()
    @IsOptional()
    startDate?: string;

    @ApiPropertyOptional()
    @IsOptional()
    endDate?: string;
}
