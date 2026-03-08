import { Module } from '@nestjs/common';
import { DemandsController } from './demands.controller';
import { CreateDemandUseCase } from './application/create-demand.usecase';
import { ListDemandsUseCase } from './application/list-demands.usecase';
import { FindDemandByIdUseCase } from './application/find-demand-by-id.usecase';
import { UpdateDemandStatusUseCase } from './application/update-demand-status.usecase';
import { AssignDemandUseCase } from './application/assign-demand.usecase';
import { DeleteDemandUseCase } from './application/delete-demand.usecase';
import { CreateDemandCommentUseCase } from './application/create-demand-comment.usecase';
import { UpdateDemandUseCase } from './application/update-demand.usecase';
import { UpdateDemandCommentUseCase } from './application/update-demand-comment.usecase';
import { DeleteDemandCommentUseCase } from './application/delete-demand-comment.usecase';
import { DeleteDemandEvidenceUseCase } from './application/delete-demand-evidence.usecase';
import { AddDemandEvidenceUseCase } from './application/add-demand-evidence.usecase';
import { DemandRepository } from './domain/demand.repository';
import { DemandRepositoryImpl } from './infrastructure/demand.repository.impl';
import { CategoriesModule } from '../categories/categories.module';
import { CloudflareUpload } from 'src/shared/infrastructure/services/cloudflare-upload.service';

@Module({
    imports: [CategoriesModule],
    controllers: [DemandsController],
    providers: [
        { provide: DemandRepository, useClass: DemandRepositoryImpl },
        CloudflareUpload,
        CreateDemandUseCase,
        ListDemandsUseCase,
        FindDemandByIdUseCase,
        UpdateDemandStatusUseCase,
        AssignDemandUseCase,
        DeleteDemandUseCase,
        CreateDemandCommentUseCase,
        UpdateDemandUseCase,
        UpdateDemandCommentUseCase,
        DeleteDemandCommentUseCase,
        DeleteDemandEvidenceUseCase,
        AddDemandEvidenceUseCase,
    ],
    exports: [
        DemandRepository,
        CloudflareUpload,
        CreateDemandUseCase,
        ListDemandsUseCase,
        FindDemandByIdUseCase,
        UpdateDemandStatusUseCase,
        AssignDemandUseCase,
        DeleteDemandUseCase,
        CreateDemandCommentUseCase,
        UpdateDemandUseCase,
        UpdateDemandCommentUseCase,
        DeleteDemandCommentUseCase,
        DeleteDemandEvidenceUseCase,
        AddDemandEvidenceUseCase,
    ],
})
export class DemandsModule { }
