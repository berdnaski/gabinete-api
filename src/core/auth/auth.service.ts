import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailUseCase } from 'src/modules/users/application/find-user-by-email.usecase';
import { PasswordHasher } from 'src/core/security/password-hasher';
import { EmailAlreadyRegisteredException } from 'src/core/exceptions/email-already-registered.exception';
import { InvalidCredentialsException } from 'src/core/exceptions/invalid-credentials.exception';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/modules/users/domain/user.entity';
import { CreateUserUseCase } from 'src/modules/users/application/create-user.usecase';

import { RegisterCabinetUseCase } from 'src/modules/cabinets/application/register-cabinet.usecase';
import { RegisterCabinetDto } from 'src/modules/cabinets/dto/register-cabinet.dto';

import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly findUserByEmail: FindUserByEmailUseCase,
        private readonly createUser: CreateUserUseCase,
        private readonly registerCabinetUseCase: RegisterCabinetUseCase,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwtService: JwtService,
    ) { }

    async registerCabinet(dto: RegisterCabinetDto) {
        return this.registerCabinetUseCase.execute(dto);
    }

    async register(dto: RegisterDto): Promise<UserResponseDto> {
        const existing = await this.findUserByEmail.execute(dto.email);
        if (existing) throw new EmailAlreadyRegisteredException();
        const user = await this.createUser.execute({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            cabinetId: dto.cabinetId,
        });
        return UserResponseDto.fromEntity(user);
    }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.findUserByEmail.execute(dto.email);
        if (!user) throw new InvalidCredentialsException();

        const valid = await this.passwordHasher.compare(dto.password, user.password);
        if (!valid) throw new InvalidCredentialsException();

        const payload = { sub: user.id, email: user.email, cabinetId: user.cabinetId };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token };
    }
}
