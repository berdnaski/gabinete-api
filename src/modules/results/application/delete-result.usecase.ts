import { Injectable, NotFoundException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";

@Injectable()
export class DeleteResultUseCase {
    constructor(
        private readonly resultRepository: ResultRepository
    ) { }

    async execute(id: string, cabinetId: string): Promise<void> {
        const result = await this.resultRepository.findById(id, cabinetId);
        if (!result) {
            throw new NotFoundException('Result not found');
        }

        await this.resultRepository.delete(id, cabinetId);
    }
}