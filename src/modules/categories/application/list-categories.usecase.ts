import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../domain/category.repository";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { CategoryResponseDto } from "../dto/category-response.dto";

@Injectable()
export class ListCategoriesUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(params: PaginationParamsDto): Promise<PaginatedResultDto<CategoryResponseDto>> {
        const result = await this.categoryRepository.list(params);

        return new PaginatedResultDto(
            result.items.map(category => CategoryResponseDto.fromEntity(category)),
            result.total,
            result.page,
            result.limit
        );
    }
}