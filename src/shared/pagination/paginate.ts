import { PaginationParamsDto } from "./pagination-params.dto";
import { PaginatedResultDto } from "./paginated-result.dto";

export async function paginate<T>(
    model: { findMany: (args: any) => Promise<any[]>; count: (args: any) => Promise<number> },
    params: PaginationParamsDto,
    where: Record<string, any> = {},
    options: { orderBy?: any; include?: any } = {}
): Promise<PaginatedResultDto<T>> {
    const { skip, limit, page } = params;

    const [items, total] = await Promise.all([
        model.findMany({ where, skip, take: limit, orderBy: options.orderBy, include: options.include }),
        model.count({ where }),
    ]);

    return new PaginatedResultDto<T>(items, total, page ?? 1, limit ?? 10);
}
