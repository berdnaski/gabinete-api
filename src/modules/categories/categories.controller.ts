import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCategoryUseCase } from './application/create-category.usecase';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { Category } from './domain/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CurrentTenantId } from 'src/shared/decorators/current-tenant.decorator';
import { ListCategoriesUseCase } from './application/list-categories.usecase';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';
import { PaginatedResultDto } from 'src/shared/pagination/paginated-result.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { FindCategoryByIdUseCase } from './application/find-category-by-id.usecase';
import { UpdateCategoryUseCase } from './application/update-category.usecase';
import { DeleteCategoryUseCase } from './application/delete-category.usecase';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Categoria já existe' })
  async create(
    @CurrentTenantId() cabinetId: string,
    @Body() dto: CreateCategoryDto
  ): Promise<Category> {
    return this.createCategoryUseCase.execute(cabinetId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias' })
  @ApiResponse({ status: 200, description: 'Categorias listadas com sucesso' })
  async list(
    @CurrentTenantId() cabinetId: string,
    @Query() params: PaginationParamsDto
  ): Promise<PaginatedResultDto<CategoryResponseDto>> {
    return this.listCategoriesUseCase.execute(cabinetId, params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  async findOne(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string
  ) {
    return this.findCategoryByIdUseCase.execute(id, cabinetId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  async update(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto
  ) {
    return this.updateCategoryUseCase.execute(id, cabinetId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover categoria (Soft-delete)' })
  @ApiResponse({ status: 204, description: 'Categoria removida com sucesso' })
  async delete(
    @CurrentTenantId() cabinetId: string,
    @Param('id') id: string
  ) {
    await this.deleteCategoryUseCase.execute(id, cabinetId);
  }
}
