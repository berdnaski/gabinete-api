import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { CurrentTenantId } from 'src/shared/decorators/current-tenant.decorator';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { ListUsersUseCase } from './application/list-users.usecase';
import { FindUserByIdUseCase } from './application/find-user-by-id.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserUseCase } from './application/delete-user.usecase';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedResultDto } from 'src/shared/pagination/paginated-result.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly listUsers: ListUsersUseCase,
        private readonly findUserById: FindUserByIdUseCase,
        private readonly updateUser: UpdateUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Listar usuários do meu gabinete' })
    @ApiResponse({ status: 200, type: PaginatedResultDto })
    async findAll(
        @CurrentTenantId() cabinetId: string,
        @Query() params: PaginationParamsDto
    ) {
        return this.listUsers.execute(cabinetId, params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um usuário' })
    @ApiResponse({ status: 200, type: UserResponseDto })
    async findOne(
        @Param('id') id: string,
        @CurrentTenantId() cabinetId: string
    ) {
        return this.findUserById.execute(id, cabinetId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiResponse({ status: 200, type: UserResponseDto })
    async update(
        @Param('id') id: string,
        @CurrentTenantId() cabinetId: string,
        @Body() dto: UpdateUserDto
    ) {
        return this.updateUser.execute(id, cabinetId, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover um usuário (Soft-delete)' })
    @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
    async remove(
        @Param('id') id: string,
        @CurrentTenantId() cabinetId: string
    ) {
        await this.deleteUser.execute(id, cabinetId);
    }
}
