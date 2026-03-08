import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { Role } from "@prisma/client";
import { CloudflareUpload } from "src/shared/infrastructure/services/cloudflare-upload.service";

@Injectable()
export class DeleteDemandEvidenceUseCase {
    constructor(
        private readonly demandRepository: DemandRepository,
        private readonly uploadService: CloudflareUpload
    ) { }

    async execute(evidenceId: string, cabinetId: string, userId: string, role: Role): Promise<void> {
        const evidence = await this.demandRepository.findEvidenceById(evidenceId);
        if (!evidence) {
            throw new NotFoundException('Evidence not found');
        }

        const demand = await this.demandRepository.findById(evidence.demandId, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        if (demand.reporterId !== userId && role === Role.USER) {
            throw new ForbiddenException('You do not have permission to delete this evidence');
        }

        await this.uploadService.delete(evidence.key);
        await this.demandRepository.deleteEvidence(evidenceId);
    }
}
