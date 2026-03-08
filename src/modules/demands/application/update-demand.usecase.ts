import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { UpdateDemandDto } from "../dto/update-demand.dto";
import { Demand } from "../domain/demand.entity";
import { Role } from "@prisma/client";

@Injectable()
export class UpdateDemandUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(id: string, cabinetId: string, userId: string, role: Role, dto: UpdateDemandDto): Promise<Demand> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        if (demand.reporterId !== userId && role === Role.USER) {
            throw new ForbiddenException('You do not have permission to edit this demand');
        }

        return this.demandRepository.update(id, cabinetId, dto);
    }
}
