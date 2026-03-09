import { ImageType, ResultType } from "@prisma/client";
import { Result } from "./result.entity";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";

export interface ResultFilters {
    type?: ResultType;
    demandId?: string;
    isActive?: boolean;
    title?: string;
}

export abstract class ResultRepository {
    abstract create(data: Partial<Result>): Promise<Result>;
    abstract findById(id: string, cabinetId: string): Promise<Result | null>;
    abstract list(cabinetId: string, params: PaginationParamsDto, filters?: ResultFilters): Promise<PaginatedResultDto<Result>>;
    abstract update(id: string, cabinetId: string, data: Partial<Result>): Promise<Result>;
    abstract delete(id: string, cabinetId: string): Promise<void>;
    abstract addImage(resultId: string, url: string, key: string, type: ImageType): Promise<void>;
    abstract findImageById(id: string): Promise<any>;
    abstract deleteImage(id: string): Promise<void>;
}
