import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateResultUseCase } from '../application/create-result.usecase';
import { AddResultImagesUseCase } from '../application/add-result-images.usecase';
import { CreateResultDto } from '../dto/create-result.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { Role, ResultType } from '@prisma/client';
import { CurrentTenantId } from 'src/shared/decorators/current-tenant.decorator';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { ListResultsUseCase } from '../application/list-results.usecase';
import { FindResultByIdUseCase } from '../application/find-result-by-id.usecase';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { UpdateResultUsecase } from '../application/update-result.usecase';
import { DeleteResultUseCase } from '../application/delete-result.usecase';
import { DeleteResultImageUseCase } from '../application/delete-result-image.usecase';
import { ListPublicResultsUseCase } from '../application/list-public-results.usecase';
import { FindPublicResultByIdUseCase } from '../application/find-public-result-by-id.usecase';

@ApiTags('results')
@ApiBearerAuth()
@Controller('results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResultsController {
  constructor(
    private readonly createResultUseCase: CreateResultUseCase,
    private readonly addImagesUseCase: AddResultImagesUseCase,
    private readonly listResultsUseCase: ListResultsUseCase,
    private readonly findResultByIdUseCase: FindResultByIdUseCase,
    private readonly updateResultUseCase: UpdateResultUsecase,
    private readonly deleteResultUseCase: DeleteResultUseCase,
    private readonly deleteResultImageUseCase: DeleteResultImageUseCase,
    private readonly listPublicResultsUseCase: ListPublicResultsUseCase,
    private readonly findPublicResultByIdUseCase: FindPublicResultByIdUseCase,
  ) { }

  @Post()
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new result (without images)' })
  async create(
    @CurrentTenantId() cabinetId: string,
    @Body() dto: CreateResultDto,
  ) {
    return this.createResultUseCase.execute(cabinetId, dto);
  }

  @Post(':id/images')
  @Roles(Role.CABINET, Role.ADMIN)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'before', maxCount: 5 },
    { name: 'after', maxCount: 5 },
    { name: 'general', maxCount: 10 },
  ]))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload images (Before/After/General) to a result' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        before: { type: 'array', items: { type: 'string', format: 'binary' } },
        after: { type: 'array', items: { type: 'string', format: 'binary' } },
        general: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  async addImages(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string,
    @UploadedFiles() files: {
      before?: Express.Multer.File[];
      after?: Express.Multer.File[];
      general?: Express.Multer.File[];
    },
  ) {
    return this.addImagesUseCase.execute(id, cabinetId, files);
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: 'List results for any cabinet (or all if not specified)' })
  async findPublic(
    @Query() params: PaginationParamsDto,
    @Query('cabinetId') cabinetId?: string,
  ) {
    return this.listPublicResultsUseCase.execute(params, cabinetId);
  }

  @Get('public/:id')
  @Public()
  @ApiOperation({ summary: 'Find a specific public result by ID' })
  async findPublicById(@Param('id') id: string) {
    return this.findPublicResultByIdUseCase.execute(id);
  }

  @Get()
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos os resultados (Painel Admin)' })
  async findAll(
    @CurrentTenantId() cabinetId: string,
    @Query() params: PaginationParamsDto,
  ) {
    return this.listResultsUseCase.execute(cabinetId, params);
  }

  @Get(':id')
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Buscar resultado por ID' })
  async findById(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string,
  ) {
    return this.findResultByIdUseCase.execute(id, cabinetId);
  }

  @Patch(':id')
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Atualizar um resultado' })
  async update(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string,
    @Body() dto: UpdateResultDto,
  ) {
    return this.updateResultUseCase.execute(id, cabinetId, dto);
  }

  @Delete(':id')
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Deletar um resultado' })
  async delete(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string,
  ) {
    return this.deleteResultUseCase.execute(id, cabinetId);
  }

  @Delete('images/:imageId')
  @Roles(Role.CABINET, Role.ADMIN)
  @ApiOperation({ summary: 'Deletar uma imagem de um resultado' })
  async deleteImage(
    @CurrentTenantId() cabinetId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.deleteResultImageUseCase.execute(imageId, cabinetId);
  }
}
