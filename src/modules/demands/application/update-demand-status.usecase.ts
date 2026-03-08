import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { Demand } from "../domain/demand.entity";
import { UpdateDemandStatusDto } from "../dto/update-demand-specialized.dto";

@Injectable()
export class UpdateDemandStatusUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(id: string, cabinetId: string, dto: UpdateDemandStatusDto): Promise<Demand> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        return this.demandRepository.updateStatus(id, cabinetId, dto.status);
    }
}
