import { Injectable } from "@nestjs/common";
import { ResultRepository } from "../domain/result.repository";
import { CreateResultDto } from "../dto/create-result.dto";
import { Result } from "../domain/result.entity";

@Injectable()
export class CreateResultUseCase {
    constructor(
        private readonly resultRepository: ResultRepository,
    ) { }

    async execute(
        cabinetId: string,
        dto: CreateResultDto,
    ): Promise<Result> {
        return this.resultRepository.create({
            title: dto.title,
            description: dto.description,
            type: dto.type,
            demandId: dto.demandId,
            cabinetId,
        });
    }
}