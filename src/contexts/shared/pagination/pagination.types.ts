export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  maxPageSize?: number;
}

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationResult<T> {
  items: T[];
  meta: PaginationMeta;
}
