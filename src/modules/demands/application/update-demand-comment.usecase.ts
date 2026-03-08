import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { CreateDemandCommentDto } from "../dto/update-demand-specialized.dto";
import { Role } from "@prisma/client";

@Injectable()
export class UpdateDemandCommentUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(commentId: string, userId: string, role: Role, dto: CreateDemandCommentDto): Promise<any> {
        const comment = await this.demandRepository.findCommentById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.authorId !== userId) {
            throw new ForbiddenException('You can only edit your own comments');
        }

        return this.demandRepository.updateComment(commentId, dto.content);
    }
}
