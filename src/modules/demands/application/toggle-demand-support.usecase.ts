import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";

@Injectable()
export class ToggleDemandSupportUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(demandId: string, cabinetId: string, userId: string): Promise<{ supported: boolean; count: number }> {
        const demand = await this.demandRepository.findById(demandId, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        const existing = await this.demandRepository.findSupport(demandId, userId);

        if (existing) {
            await this.demandRepository.removeSupport(demandId, userId);
        } else {
            await this.demandRepository.addSupport(demandId, userId);
        }

        const count = await this.demandRepository.countSupports(demandId);
        return { supported: !existing, count };
    }
}
