import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { RegisterCabinetDto } from 'src/modules/cabinets/dto/register-cabinet.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register-cabinet')
    @ApiOperation({ summary: 'Registrar um novo gabinete e o administrador' })
    @ApiResponse({ status: 201, description: 'Gabinete e administrador criados com sucesso.' })
    async registerCabinet(@Body() dto: RegisterCabinetDto) {
        return this.authService.registerCabinet(dto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'E-mail já cadastrado' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realizar login e obter token JWT' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
