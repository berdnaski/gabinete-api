import { PaginationParamsDto } from "../../shared/pagination/pagination-params.dto";
import { PaginatedResultDto } from "../../shared/pagination/paginated-result.dto";

export abstract class BaseTenantRepository<T> {
    protected async findManyPaginated(
        model: any,
        cabinetId: string,
        params: PaginationParamsDto,
        extraWhere: any = {},
        include: any = {}
    ): Promise<PaginatedResultDto<T>> {
        const { skip, limit, page } = params;

        const where = {
            ...extraWhere,
            cabinetId,
        };

        const [items, total] = await Promise.all([
            model.findMany({
                where,
                skip,
                take: limit,
                include,
                orderBy: { createdAt: 'desc' },
            }),
            model.count({ where }),
        ]);

        return new PaginatedResultDto<T>(
            items,
            total,
            params.page ?? 1,
            params.limit ?? 10
        );
    }


    protected async findOneByTenant(
        model: any,
        id: string,
        cabinetId: string,
        include: any = {}
    ): Promise<T | null> {
        return model.findFirst({
            where: {
                id,
                cabinetId,
            },
            include,
        });
    }

    protected async updateByTenant(
        model: any,
        id: string,
        cabinetId: string,
        data: any
    ): Promise<T> {
        return model.update({
            where: {
                id,
                cabinetId,
            },
            data,
        });
    }

    protected async softDeleteByTenant(
        model: any,
        id: string,
        cabinetId: string
    ): Promise<T> {
        return model.update({
            where: {
                id,
                cabinetId,
            },
            data: {
                isActive: false,
            },
        });
    }
}
