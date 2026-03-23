import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "../domain/category.repository";
import { CategoryResponseDto } from "../dto/category-response.dto";

@Injectable()
export class FindCategoryByIdUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return CategoryResponseDto.fromEntity(category);
    }
}