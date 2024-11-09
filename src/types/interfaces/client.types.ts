export interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

export interface UseTableProps<TData> {
  url: string;
  initialPageSize: number;
  searchFields?: string[];
  defaultSort?: Array<{
    field: keyof TData;
    order: 'asc' | 'desc';
  }>;
}
