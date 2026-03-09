import { Injectable, NotFoundException } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { Result } from "../domain/result.entity";

@Injectable()
export class FindPublicResultByIdUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(id: string): Promise<Result | null> {
        const result = await this.resultRepository.findByIdPublic(id);
        if (!result) {
            throw new NotFoundException('Result not found or not public');
        }
        return result;
    }
}
