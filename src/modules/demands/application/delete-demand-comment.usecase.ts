import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DemandRepository } from "../domain/demand.repository";
import { Role } from "@prisma/client";

@Injectable()
export class DeleteDemandCommentUseCase {
    constructor(private readonly demandRepository: DemandRepository) { }

    async execute(commentId: string, userId: string, role: Role): Promise<void> {
        const comment = await this.demandRepository.findCommentById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.authorId !== userId && role === Role.USER) {
            throw new ForbiddenException('You do not have permission to delete this comment');
        }

        await this.demandRepository.deleteComment(commentId);
    }
}
