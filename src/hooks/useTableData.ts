'use client';

import { fetchData } from '@/actions';
import { GetListProps } from '@/funcs/interfaces';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState } from 'react';

interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

interface UseTableProps<TData> {
  url: string;
  initialPageSize: number;
  searchFields?: string[];
  defaultSort?: Array<{
    field: keyof TData;
    order: 'asc' | 'desc';
  }>;
}

export function useTableData<T>({
  url,
  initialPageSize = 10,
  searchFields = ['name'],
  defaultSort = [{ field: 'name' as keyof T, order: 'asc' }],
}: UseTableProps<T>) {
  const [tableParams, setTableParams] = useState<Partial<GetListProps>>({
    pageIndex: 1,
    pageSize: initialPageSize,
    search: {
      value: '',
      fields: searchFields,
    },
    sortBy: defaultSort,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['table-data', url, tableParams],
    queryFn: () => fetchData(url, tableParams),
    placeholderData: true, // Show old data while fetching new data
  });

  const handlePageChange = (newPage: number) => {
    setTableParams((prev) => ({
      ...prev,
      pageIndex: newPage,
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setTableParams({
      pageIndex: 1, // Reset to first page when changing page size
      pageSize: newPageSize,
    });
  };

  // Debounced search function
  const debouncedSearch = debounce((searchValue: string) => {
    setTableParams((prev) => ({
      ...prev,
      pageIndex: 1, // Reset to first page on search
      search: {
        ...prev.search,
        fields: prev.search?.fields ?? [], // Provide a default value for fields
        value: searchValue,
      },
    }));
  }, 100);

  const handleSearch = (searchValue: string) => {
    debouncedSearch(searchValue);
  };

  const handleSort = (field: string) => {
    const currentSort = tableParams.sortBy?.[0];
    const newOrder: SortConfig['order'] =
      currentSort?.field === field && currentSort.order === 'asc' ? 'desc' : 'asc';

    setTableParams((prev) => ({
      ...prev,
      sortBy: [{ field, order: newOrder }],
    }));
  };

  return {
    data: data?.data ?? [],
    totalPages: data?.meta?.totalPages ?? 0,
    totalItems: data?.meta?.totalItems ?? 0,
    pageIndex: tableParams.pageIndex,
    pageSize: tableParams.pageSize,
    isLoading,
    error,
    sortConfig: tableParams.sortBy?.[0],
    searchValue: tableParams.search?.value ?? '',
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  };
}
