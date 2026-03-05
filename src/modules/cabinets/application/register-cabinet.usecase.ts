import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PasswordHasher } from 'src/core/security/password-hasher';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { RegisterCabinetResponseDto } from '../dto/register-cabinet-response.dto';
import { RegisterCabinetDto } from '../dto/register-cabinet.dto';
import { EmailAlreadyRegisteredException } from 'src/core/exceptions/email-already-registered.exception';
import { Role } from '@prisma/client';

import { SlugAlreadyInUseException } from 'src/core/exceptions/slug-already-in-use.exception';

@Injectable()
export class RegisterCabinetUseCase {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordHasher: PasswordHasher,
    ) { }

    async execute(dto: RegisterCabinetDto): Promise<RegisterCabinetResponseDto> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.ownerEmail },
        });

        if (existingUser) {
            throw new EmailAlreadyRegisteredException();
        }

        const existingCabinet = await this.prisma.cabinet.findUnique({
            where: { slug: dto.cabinetSlug },
        });

        if (existingCabinet) {
            throw new SlugAlreadyInUseException();
        }

        const hashedPassword = await this.passwordHasher.hash(dto.ownerPassword);

        return this.prisma.$transaction(async (tx) => {
            const cabinet = await tx.cabinet.create({
                data: {
                    name: dto.cabinetName,
                    slug: dto.cabinetSlug,
                },
            });

            const user = await tx.user.create({
                data: {
                    name: dto.ownerName,
                    email: dto.ownerEmail,
                    password: hashedPassword,
                    role: Role.CABINET,
                    cabinetId: cabinet.id,
                },
            });

            return {
                cabinet,
                user: UserResponseDto.fromEntity(user),
            };
        });
    }
}
