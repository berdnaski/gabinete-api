import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { CreateDemandCommentDto } from "../dto/update-demand-specialized.dto";

@Injectable()
export class CreateDemandCommentUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(demandId: string, cabinetId: string, authorId: string, dto: CreateDemandCommentDto): Promise<any> {
        const demand = await this.demandRepository.findById(demandId, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        return this.demandRepository.addComment(demandId, authorId, dto.content);
    }
}
