export class DemandComment {
    id: string;
    content: string;
    isOfficialResponse: boolean;
    demandId: string;
    authorId: string;
    author?: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
