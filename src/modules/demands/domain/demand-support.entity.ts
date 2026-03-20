export class DemandSupport {
    id: string;
    demandId: string;
    userId: string;
    user?: {
        id: string;
        name: string;
    };
    createdAt: Date;
}
