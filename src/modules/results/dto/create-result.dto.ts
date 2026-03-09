import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ResultType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateResultDto {
    @ApiProperty({ example: "Reforma da Praça Central" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: "Concluímos a reforma com novos bancos e iluminação LED." })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ enum: ResultType, example: ResultType.INFRASTRUCTURE })
    @IsEnum(ResultType)
    @IsOptional()
    type?: ResultType;

    @ApiPropertyOptional({ example: "uuid-da-demanda" })
    @IsUUID()
    @IsOptional()
    demandId?: string;
}
