import { Role } from '@prisma/client';
import { User } from './user.entity';
import { PaginatedResultDto } from 'src/shared/pagination/paginated-result.dto';
import { PaginationParamsDto } from 'src/shared/pagination/pagination-params.dto';

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string, cabinetId: string): Promise<User | null>;
    abstract list(cabinetId: string, params: PaginationParamsDto): Promise<PaginatedResultDto<User>>;
    abstract update(id: string, cabinetId: string, data: Partial<User>): Promise<User>;
    abstract delete(id: string, cabinetId: string): Promise<User>;
    abstract create(data: {
        name: string;
        email: string;
        password: string;
        role?: Role;
        cabinetId: string;
    }): Promise<User>;
}
