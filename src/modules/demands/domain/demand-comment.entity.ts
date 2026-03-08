export class DemandComment {
    id: string;
    content: string;
    demandId: string;
    authorId: string;
    author?: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
