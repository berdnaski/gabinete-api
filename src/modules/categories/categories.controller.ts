import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCategoryUseCase } from './application/create-category.usecase';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Category } from './domain/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
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
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.ADMIN, Role.CABINET)
  @ApiOperation({ summary: 'Criar uma categoria (global)' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 409, description: 'Categoria já existe' })
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.createCategoryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias globais' })
  @ApiResponse({ status: 200, description: 'Categorias listadas com sucesso' })
  async list(@Query() params: PaginationParamsDto): Promise<PaginatedResultDto<CategoryResponseDto>> {
    return this.listCategoriesUseCase.execute(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  async findOne(@Param('id') id: string) {
    return this.findCategoryByIdUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.CABINET)
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CABINET)
  @ApiOperation({ summary: 'Remover categoria (Soft-delete)' })
  @ApiResponse({ status: 204, description: 'Categoria removida com sucesso' })
  async delete(@Param('id') id: string) {
    await this.deleteCategoryUseCase.execute(id);
  }
}
