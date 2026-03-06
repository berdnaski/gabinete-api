import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "../domain/category.repository";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryResponseDto } from "../dto/category-response.dto";

@Injectable()
export class UpdateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(id: string, cabinetId: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const category = await this.categoryRepository.findById(id, cabinetId);
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const updated = await this.categoryRepository.update(id, cabinetId, dto);
        return CategoryResponseDto.fromEntity(updated);
    }
}
