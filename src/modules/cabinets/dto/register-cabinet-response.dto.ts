import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { Cabinet } from '../domain/cabinet.entity';

export class RegisterCabinetResponseDto {
    @ApiProperty()
    cabinet: Cabinet;

    @ApiProperty()
    user: UserResponseDto;
}
