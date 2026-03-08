import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";

@Injectable()
export class DeleteDemandUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(id: string, cabinetId: string): Promise<void> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        await this.demandRepository.delete(id, cabinetId);
    }
}
