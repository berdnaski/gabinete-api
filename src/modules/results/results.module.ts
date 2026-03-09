import { Module } from '@nestjs/common';
import { ResultsController } from './infrastructure/results.controller';
import { CreateResultUseCase } from './application/create-result.usecase';
import { AddResultImagesUseCase } from './application/add-result-images.usecase';
import { ListResultsUseCase } from './application/list-results.usecase';
import { FindResultByIdUseCase } from './application/find-result-by-id.usecase';
import { ResultRepository } from './domain/result.repository';
import { ResultRepositoryImpl } from './infrastructure/result.repository.impl';
import { CloudflareUpload } from 'src/shared/infrastructure/services/cloudflare-upload.service';
import { UpdateResultUsecase } from './application/update-result.usecase';
import { DeleteResultUseCase } from './application/delete-result.usecase';
import { DeleteResultImageUseCase } from './application/delete-result-image.usecase';

@Module({
  controllers: [ResultsController],
  providers: [
    { provide: ResultRepository, useClass: ResultRepositoryImpl },
    CloudflareUpload,
    CreateResultUseCase,
    AddResultImagesUseCase,
    ListResultsUseCase,
    FindResultByIdUseCase,
    UpdateResultUsecase,
    DeleteResultUseCase,
    DeleteResultImageUseCase,
  ],
  exports: [
    ResultRepository,
    CreateResultUseCase,
    AddResultImagesUseCase,
    ListResultsUseCase,
    FindResultByIdUseCase,
    UpdateResultUsecase,
    DeleteResultUseCase,
    DeleteResultImageUseCase,
  ],
})
export class ResultsModule { }
