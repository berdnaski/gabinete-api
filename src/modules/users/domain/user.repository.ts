import { Role } from '@prisma/client';
import { User } from './user.entity';

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract create(data: {
        name: string;
        email: string;
        password: string;
        role?: Role;
        cabinetId: string;
    }): Promise<User>;
}
