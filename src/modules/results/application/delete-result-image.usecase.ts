import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";

@Injectable()
export class DeleteResultImageUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(imageId: string, cabinetId: string): Promise<void> {
        const image = await this.resultRepository.findImageById(imageId);

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        // Verify if the result belongs to the cabinet
        const result = await this.resultRepository.findById(image.resultId, cabinetId);
        if (!result) {
            throw new ForbiddenException('You do not have permission to delete this image');
        }

        await this.resultRepository.deleteImage(imageId);
    }
}
