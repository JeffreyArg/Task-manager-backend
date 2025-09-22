import { SelectQueryBuilder } from 'typeorm';
import { PaginationParams, PaginationResult } from './pagination.types';

export const DEFAULT_MAX_PAGE_SIZE = 100;

export function normalizePaginationParams(params: PaginationParams) {
    const maxPageSize = params.maxPageSize ?? DEFAULT_MAX_PAGE_SIZE;

    const pageNumber = Math.max(1, Number(params.pageNumber ?? 1));
    const rawPageSize = Number(params.pageSize ?? 20);
    const pageSize = Math.min(Math.max(1, rawPageSize), maxPageSize);

    const offset = (pageNumber - 1) * pageSize;

    return { pageNumber, pageSize, offset };
}

export async function paginateQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T>,
    params: PaginationParams,
): Promise<PaginationResult<T>> {
    const { pageNumber, pageSize, offset } = normalizePaginationParams(params);

    const [items, totalItems] = await queryBuilder
        .skip(offset)
        .take(pageSize)
        .getManyAndCount();

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    return {
        items,
        meta: { pageNumber, pageSize, totalItems, totalPages },
    };
}
