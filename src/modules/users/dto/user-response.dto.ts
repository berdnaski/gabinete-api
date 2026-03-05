import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ enum: Role })
    role: Role;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    cabinetId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    static fromEntity(user: any): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = user.id;
        dto.name = user.name;
        dto.email = user.email;
        dto.role = user.role;
        dto.isActive = user.isActive;
        dto.cabinetId = user.cabinetId;
        dto.createdAt = user.createdAt;
        dto.updatedAt = user.updatedAt;
        return dto;
    }
}
