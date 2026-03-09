import { Injectable } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { Result } from "../domain/result.entity";

@Injectable()
export class ListPublicResultsUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(params: PaginationParamsDto, cabinetId?: string): Promise<PaginatedResultDto<Result>> {
        return this.resultRepository.listPublic(params, cabinetId);
    }
}
