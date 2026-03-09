import { Injectable, NotFoundException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { Result } from "../domain/result.entity";

@Injectable()
export class FindResultByIdUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(id: string, cabinetId: string): Promise<Result | null> {
        const result = await this.resultRepository.findById(id, cabinetId);
        if (!result) {
            throw new NotFoundException('Result not found');
        }
        return result;
    }
}