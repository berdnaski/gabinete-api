import { Injectable, NotFoundException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { Result } from "../domain/result.entity";

@Injectable()
export class UpdateResultUsecase {
    constructor(
        private readonly resultRepository: ResultRepository
    ) { }

    async execute(id: string, cabinetId: string, data: Partial<Result>): Promise<Result> {
        const result = await this.resultRepository.findById(id, cabinetId);
        if (!result) {
            throw new NotFoundException('Result not found');
        }

        return this.resultRepository.update(id, cabinetId, data);
    }
}