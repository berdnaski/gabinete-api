import { DemandStatus } from "@prisma/client";

export class DemandEvidence {
    id: string;
    url: string;
    key: string;
    mimeType: string;
    demandId: string;
    createdAt: Date;
}

export class Demand {
    id: string;
    title: string;
    description: string;
    status: DemandStatus;
    latitude?: number;
    longitude?: number;
    address?: string;
    googlePlaceId?: string;
    cabinetId: string;
    categoryId: string;
    reporterId: string;
    assigneeId?: string;
    evidences?: DemandEvidence[];
    createdAt: Date;
    updatedAt: Date;
}
