import { ConflictException, Injectable } from "@nestjs/common";
import { Category } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async execute(cabinetId: string, dto: CreateCategoryDto): Promise<Category> {
        const existing = await this.categoryRepository.findByName(dto.name, cabinetId);
        if (existing) {
            throw new ConflictException('Category already exists in this cabinet');
        }

        return this.categoryRepository.create({
            name: dto.name,
            cabinetId: cabinetId
        } as Category);
    }
}