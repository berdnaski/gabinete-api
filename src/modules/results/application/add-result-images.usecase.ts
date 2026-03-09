import { Injectable, NotFoundException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { CloudflareUpload } from "src/shared/infrastructure/services/cloudflare-upload.service";
import { ImageType } from "@prisma/client";

@Injectable()
export class AddResultImagesUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
        private readonly uploadService: CloudflareUpload,
    ) { }

    async execute(
        id: string,
        cabinetId: string,
        files: {
            before?: Express.Multer.File[];
            after?: Express.Multer.File[];
            general?: Express.Multer.File[];
        }
    ): Promise<void> {
        const result = await this.resultRepository.findById(id, cabinetId);
        if (!result) {
            throw new NotFoundException('Result not found');
        }

        const uploadPromises: Promise<void>[] = [];

        if (files.before?.length) {
            files.before.forEach(file => {
                uploadPromises.push(this.uploadAndSaveImage(id, file, ImageType.BEFORE));
            });
        }
        if (files.after?.length) {
            files.after.forEach(file => {
                uploadPromises.push(this.uploadAndSaveImage(id, file, ImageType.AFTER));
            });
        }
        if (files.general?.length) {
            files.general.forEach(file => {
                uploadPromises.push(this.uploadAndSaveImage(id, file, ImageType.GENERAL));
            });
        }

        await Promise.all(uploadPromises);
    }

    private async uploadAndSaveImage(resultId: string, file: Express.Multer.File, type: ImageType): Promise<void> {
        const upload = await this.uploadService.upload({
            buffer: file.buffer,
            filename: file.originalname,
            mimetype: file.mimetype,
            folder: `results/${resultId}/${type.toLowerCase()}`,
        });

        await this.resultRepository.addImage(
            resultId,
            upload.path,
            upload.path,
            type
        );
    }
}
