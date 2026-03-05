import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'joao@exemplo.com', description: 'E-mail do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', description: 'ID do gabinete' })
    @IsUUID()
    @IsNotEmpty()
    cabinetId: string;
}
