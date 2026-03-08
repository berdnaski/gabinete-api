import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { Demand } from "../domain/demand.entity";
import { AssignDemandDto } from "../dto/update-demand-specialized.dto";

@Injectable()
export class AssignDemandUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(id: string, cabinetId: string, dto: AssignDemandDto): Promise<Demand> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        return this.demandRepository.assign(id, cabinetId, dto.assigneeId);
    }
}
