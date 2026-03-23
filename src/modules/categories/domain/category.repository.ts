import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { Category } from "./category.entity";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";

export abstract class CategoryRepository {
    abstract create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Category>;
    abstract findByName(name: string): Promise<Category | null>;
    abstract list(params: PaginationParamsDto): Promise<PaginatedResultDto<Category>>;
    abstract findById(id: string): Promise<Category | null>;
    abstract update(id: string, data: Partial<Category>): Promise<Category>;
    abstract delete(id: string): Promise<Category>;
}