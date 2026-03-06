import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../domain/category.repository";
import { Category } from "../domain/category.entity";
import { CategoryResponseDto } from "../dto/category-response.dto";

@Injectable()
export class FindCategoryByIdUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(id: string, cabinetId: string): Promise<Category | null> {
        const category = await this.categoryRepository.findById(id, cabinetId);
        if (!category) {
            throw new Error('Category not found');
        }

        return CategoryResponseDto.fromEntity(category);
    }
}