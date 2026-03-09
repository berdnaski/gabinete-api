import { ResultType, ImageType } from "@prisma/client";

export class ResultImage {
    id: string;
    url: string;
    key: string;
    type: ImageType;
    resultId: string;
}

export class Result {
    id: string;
    title: string;
    description: string;
    date: Date;
    type: ResultType;
    isActive: boolean;
    isPublic: boolean;
    cabinetId: string;
    demandId?: string | null;
    images?: ResultImage[];
    createdAt: Date;
    updatedAt: Date;
}
