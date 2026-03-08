import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { Demand } from "../domain/demand.entity";

@Injectable()
export class FindDemandByIdUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(id: string, cabinetId: string): Promise<Demand> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }
        return demand;
    }
}
