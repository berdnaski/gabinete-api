import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { CloudflareUpload } from "src/shared/infrastructure/services/cloudflare-upload.service";
import { Role } from "@prisma/client";

@Injectable()
export class AddDemandEvidenceUseCase {
    constructor(
        private readonly demandRepository: DemandRepository,
        private readonly uploadService: CloudflareUpload,
    ) { }

    async execute(id: string, cabinetId: string, userId: string, role: Role, files: Express.Multer.File[]): Promise<void> {
        const demand = await this.demandRepository.findById(id, cabinetId);
        if (!demand) {
            throw new NotFoundException('Demand not found');
        }

        if (demand.reporterId !== userId && role === Role.USER) {
            throw new ForbiddenException('You do not have permission to add evidence to this demand');
        }

        if (files && files.length > 0) {
            for (const file of files) {
                const upload = await this.uploadService.upload({
                    buffer: file.buffer,
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    folder: `demands/${demand.id}`,
                });

                await this.demandRepository.addEvidence(
                    demand.id,
                    upload.path,
                    upload.path,
                    file.mimetype
                );
            }
        }
    }
}
