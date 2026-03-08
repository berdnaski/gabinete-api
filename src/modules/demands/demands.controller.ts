import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { CurrentTenantId } from 'src/shared/decorators/current-tenant.decorator';
import { CurrentUser, AuthUserPayload } from 'src/shared/decorators/current-user.decorator';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { CreateDemandUseCase } from './application/create-demand.usecase';
import { ListDemandsUseCase } from './application/list-demands.usecase';
import { FindDemandByIdUseCase } from './application/find-demand-by-id.usecase';
import { UpdateDemandStatusUseCase } from './application/update-demand-status.usecase';
import { AssignDemandUseCase } from './application/assign-demand.usecase';
import { DeleteDemandUseCase } from './application/delete-demand.usecase';
import { CreateDemandCommentUseCase } from './application/create-demand-comment.usecase';
import { UpdateDemandUseCase } from './application/update-demand.usecase';
import { UpdateDemandCommentUseCase } from './application/update-demand-comment.usecase';
import { DeleteDemandCommentUseCase } from './application/delete-demand-comment.usecase';
import { DeleteDemandEvidenceUseCase } from './application/delete-demand-evidence.usecase';
import { AddDemandEvidenceUseCase } from './application/add-demand-evidence.usecase';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { AssignDemandDto, CreateDemandCommentDto, UpdateDemandStatusDto } from './dto/update-demand-specialized.dto';

@ApiTags('demands')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('demands')
export class DemandsController {
    constructor(
        private readonly createDemand: CreateDemandUseCase,
        private readonly listDemands: ListDemandsUseCase,
        private readonly findDemandById: FindDemandByIdUseCase,
        private readonly updateDemandStatus: UpdateDemandStatusUseCase,
        private readonly assignDemand: AssignDemandUseCase,
        private readonly deleteDemand: DeleteDemandUseCase,
        private readonly createComment: CreateDemandCommentUseCase,
        private readonly updateDemandUseCase: UpdateDemandUseCase,
        private readonly updateCommentUseCase: UpdateDemandCommentUseCase,
        private readonly deleteCommentUseCase: DeleteDemandCommentUseCase,
        private readonly deleteEvidenceUseCase: DeleteDemandEvidenceUseCase,
        private readonly addEvidenceUseCase: AddDemandEvidenceUseCase,
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Criar uma nova demanda com evidências' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                categoryId: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                address: { type: 'string' },
                googlePlaceId: { type: 'string' },
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    async create(
        @CurrentTenantId() cabinetId: string,
        @CurrentUser() user: AuthUserPayload,
        @Body() dto: CreateDemandDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.createDemand.execute(cabinetId, user.userId, dto, files);
    }

    @Get()
    @ApiOperation({ summary: 'Listar demandas do gabinete' })
    async findAll(
        @CurrentTenantId() cabinetId: string,
        @Query() params: PaginationParamsDto,
    ) {
        return this.listDemands.execute(cabinetId, params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar demanda por ID' })
    async findOne(
        @CurrentTenantId() cabinetId: string,
        @Param('id') id: string,
    ) {
        return this.findDemandById.execute(id, cabinetId);
    }

    @Patch(':id/status')
    @Roles(Role.CABINET, Role.ADMIN)
    @ApiOperation({ summary: 'Atualizar status da demanda' })
    async updateStatus(
        @CurrentTenantId() cabinetId: string,
        @Param('id') id: string,
        @Body() dto: UpdateDemandStatusDto,
    ) {
        return this.updateDemandStatus.execute(id, cabinetId, dto);
    }

    @Patch(':id/assign')
    @Roles(Role.CABINET, Role.ADMIN)
    @ApiOperation({ summary: 'Designar demanda para um assessor' })
    async assign(
        @CurrentTenantId() cabinetId: string,
        @Param('id') id: string,
        @Body() dto: AssignDemandDto,
    ) {
        return this.assignDemand.execute(id, cabinetId, dto);
    }

    @Delete(':id')
    @Roles(Role.CABINET, Role.ADMIN)
    @ApiOperation({ summary: 'Remover demanda (Soft-delete)' })
    @ApiResponse({ status: 204 })
    async remove(
        @CurrentTenantId() cabinetId: string,
        @Param('id') id: string,
    ) {
        await this.deleteDemand.execute(id, cabinetId);
    }

    @Post(':id/comments')
    @ApiOperation({ summary: 'Adicionar comentário à demanda' })
    async addComment(
        @CurrentTenantId() cabinetId: string,
        @CurrentUser() user: AuthUserPayload,
        @Param('id') demandId: string,
        @Body() dto: CreateDemandCommentDto,
    ) {
        return this.createComment.execute(demandId, cabinetId, user.userId, dto);
    }

    @Patch('comments/:commentId')
    @ApiOperation({ summary: 'Editar um comentário' })
    async updateComment(
        @CurrentUser() user: AuthUserPayload,
        @Param('commentId') commentId: string,
        @Body() dto: CreateDemandCommentDto,
    ) {
        return this.updateCommentUseCase.execute(commentId, user.userId, user.role, dto);
    }

    @Delete('comments/:commentId')
    @ApiOperation({ summary: 'Remover um comentário' })
    @ApiResponse({ status: 204 })
    async removeComment(
        @CurrentUser() user: AuthUserPayload,
        @Param('commentId') commentId: string,
    ) {
        await this.deleteCommentUseCase.execute(commentId, user.userId, user.role);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar dados gerais da demanda' })
    async update(
        @CurrentTenantId() cabinetId: string,
        @CurrentUser() user: AuthUserPayload,
        @Param('id') id: string,
        @Body() dto: UpdateDemandDto,
    ) {
        return this.updateDemandUseCase.execute(id, cabinetId, user.userId, user.role, dto);
    }

    @Post(':id/evidences')
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Adicionar mais evidências (fotos) a uma demanda existente' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    async addEvidences(
        @CurrentTenantId() cabinetId: string,
        @CurrentUser() user: AuthUserPayload,
        @Param('id') id: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.addEvidenceUseCase.execute(id, cabinetId, user.userId, user.role, files);
    }

    @Delete('evidences/:evidenceId')
    @ApiOperation({ summary: 'Remover uma evidência (foto)' })
    @ApiResponse({ status: 204 })
    async removeEvidence(
        @CurrentTenantId() cabinetId: string,
        @CurrentUser() user: AuthUserPayload,
        @Param('evidenceId') evidenceId: string,
    ) {
        await this.deleteEvidenceUseCase.execute(evidenceId, cabinetId, user.userId, user.role);
    }
}
