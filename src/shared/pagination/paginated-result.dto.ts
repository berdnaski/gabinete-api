import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto<T> {
    @ApiProperty({ isArray: true })
    items: T[];

    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    lastPage: number;

    constructor(items: T[], total: number, page: number, limit: number) {
        this.items = items;
        this.total = total;
        this.page = Number(page);
        this.limit = Number(limit);
        this.lastPage = Math.ceil(total / limit);
    }
}
