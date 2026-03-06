import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "../domain/category.repository";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(id: string, cabinetId: string): Promise<void> {
        const category = await this.categoryRepository.findById(id, cabinetId);
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        await this.categoryRepository.delete(id, cabinetId);
    }
}
