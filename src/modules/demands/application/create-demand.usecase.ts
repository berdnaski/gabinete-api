import { Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { CreateDemandDto } from "../dto/create-demand.dto";
import { CategoryRepository } from "../../categories/domain/category.repository";
import { CloudflareUpload } from "src/shared/infrastructure/services/cloudflare-upload.service";
import { Demand } from "../domain/demand.entity";

@Injectable()
export class CreateDemandUseCase {
    constructor(
        private readonly demandRepository: DemandRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly uploadService: CloudflareUpload,
    ) { }

    async execute(
        cabinetId: string,
        reporterId: string,
        dto: CreateDemandDto,
        files?: Express.Multer.File[]
    ): Promise<Demand> {
        const category = await this.categoryRepository.findById(dto.categoryId);
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const demand = await this.demandRepository.create({
            title: dto.title,
            description: dto.description,
            categoryId: dto.categoryId,
            latitude: dto.latitude,
            longitude: dto.longitude,
            address: dto.address,
            googlePlaceId: dto.googlePlaceId,
            cabinetId,
            reporterId,
        });

        if (files?.length) {
            await Promise.all(
                files.map(async (file) => {
                    const upload = await this.uploadService.upload({
                        buffer: file.buffer,
                        filename: file.originalname,
                        mimetype: file.mimetype,
                        folder: `demands/${demand.id}`,
                    });

                    return this.demandRepository.addEvidence(
                        demand.id,
                        upload.path,
                        upload.path,
                        file.mimetype
                    );
                }),
            );
        }

        return this.demandRepository.findById(demand.id, cabinetId) as Promise<Demand>;
    }
}
