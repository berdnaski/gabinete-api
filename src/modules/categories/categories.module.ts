import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase } from './application/create-category.usecase';
import { CategoryRepository } from './domain/category.repository';
import { CategoryRepositoryImpl } from './infrastructure/category.repository.impl';
import { ListCategoriesUseCase } from './application/list-categories.usecase';
import { FindCategoryByIdUseCase } from './application/find-category-by-id.usecase';
import { UpdateCategoryUseCase } from './application/update-category.usecase';
import { DeleteCategoryUseCase } from './application/delete-category.usecase';

@Module({
  controllers: [CategoriesController],
  providers: [
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    FindCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  exports: [
    CategoryRepository,
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    FindCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
})
export class CategoriesModule { }
