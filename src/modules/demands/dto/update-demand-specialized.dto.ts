import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DemandStatus } from '@prisma/client';

export class UpdateDemandStatusDto {
    @ApiProperty({ enum: DemandStatus, example: 'IN_PROGRESS' })
    @IsEnum(DemandStatus)
    @IsNotEmpty()
    status: DemandStatus;
}

export class AssignDemandDto {
    @ApiProperty({ example: 'uuid-do-assessor' })
    @IsUUID()
    @IsOptional()
    assigneeId: string | null;
}

export class CreateDemandCommentDto {
    @ApiProperty({ example: 'Vou verificar isso hoje mesmo.' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: false, required: false, description: 'Marcar como resposta oficial do gabinete' })
    @IsBoolean()
    @IsOptional()
    isOfficialResponse?: boolean;
}
