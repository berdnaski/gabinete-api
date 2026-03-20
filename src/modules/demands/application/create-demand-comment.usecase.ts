import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { CreateDemandCommentDto } from "../dto/update-demand-specialized.dto";
import { Role } from "@prisma/client";

@Injectable()
export class CreateDemandCommentUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(demandId: string, cabinetId: string, authorId: string, role: Role, dto: CreateDemandCommentDto): Promise<any> {
        const demand = await this.demandRepository.findById(demandId, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        if (dto.isOfficialResponse && role === Role.USER) {
            throw new ForbiddenException('Only cabinet staff can post official responses');
        }

        return this.demandRepository.addComment(demandId, authorId, dto.content, dto.isOfficialResponse ?? false);
    }
}
