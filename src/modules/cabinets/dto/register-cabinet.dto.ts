import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterCabinetDto {
    @ApiProperty({ example: 'Gabinete do Vereador João' })
    @IsString()
    @IsNotEmpty()
    cabinetName: string;

    @ApiProperty({ example: 'vereador-joao' })
    @IsString()
    @IsNotEmpty()
    cabinetSlug: string;

    @ApiProperty({ example: 'João Silva' })
    @IsString()
    @IsNotEmpty()
    ownerName: string;

    @ApiProperty({ example: 'joao@exemplo.com' })
    @IsEmail()
    ownerEmail: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @MinLength(6)
    ownerPassword: string;
}
