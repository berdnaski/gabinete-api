import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";

@Injectable()
export class GetDemandSupportStatusUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(demandId: string, cabinetId: string, userId: string): Promise<{ supported: boolean; count: number; goal: number | null }> {
        const demand = await this.demandRepository.findById(demandId, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        const [existing, count] = await Promise.all([
            this.demandRepository.findSupport(demandId, userId),
            this.demandRepository.countSupports(demandId),
        ]);

        return {
            supported: !!existing,
            count,
            goal: (demand as any).supportGoal ?? null,
        };
    }
}
