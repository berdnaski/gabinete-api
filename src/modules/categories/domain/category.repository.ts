import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { Category } from "./category.entity";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";

export abstract class CategoryRepository {
    abstract create(data: Category): Promise<Category>;
    abstract findByName(name: string, cabinetId: string): Promise<Category | null>;
    abstract list(cabinetId: string, params: PaginationParamsDto): Promise<PaginatedResultDto<Category>>;
    abstract findById(id: string, cabinetId: string): Promise<Category | null>;
    abstract update(id: string, cabinetId: string, data: Partial<Category>): Promise<Category>;
    abstract delete(id: string, cabinetId: string): Promise<Category>;
}