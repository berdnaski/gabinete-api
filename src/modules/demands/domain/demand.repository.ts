import { PaginationParamsDto } from "src/shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "src/shared/pagination/paginated-result.dto";
import { Demand } from "./demand.entity";

export abstract class DemandRepository {
    abstract create(data: Partial<Demand>): Promise<Demand>;
    abstract findById(id: string, cabinetId: string): Promise<Demand | null>;
    abstract list(cabinetId: string, params: PaginationParamsDto, filters?: any): Promise<PaginatedResultDto<Demand>>;
    abstract update(id: string, cabinetId: string, data: Partial<Demand>): Promise<Demand>;
    abstract delete(id: string, cabinetId: string): Promise<Demand>;
    abstract addEvidence(demandId: string, url: string, key: string, mimeType: string): Promise<void>;
    abstract updateStatus(id: string, cabinetId: string, status: string): Promise<Demand>;
    abstract assign(id: string, cabinetId: string, assigneeId: string | null): Promise<Demand>;
    abstract addComment(demandId: string, authorId: string, content: string): Promise<any>;
    abstract findCommentById(id: string): Promise<any>;
    abstract updateComment(id: string, content: string): Promise<any>;
    abstract deleteComment(id: string): Promise<void>;
    abstract deleteEvidence(id: string): Promise<void>;
    abstract findEvidenceById(id: string): Promise<any>;
}
