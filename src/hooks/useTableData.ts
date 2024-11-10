'use client';

import { fetchListData } from '@/lib/utils';
import { GetListProps, SortConfig, UseTableProps } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState } from 'react';

export function useTableData<T>({
  url,
  modelName,
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
    queryKey: [modelName, url, tableParams],
    queryFn: () => fetchListData(url, tableParams),
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

  const handleSearchFieldChange = (newFields: string[]) => {
    setTableParams((prev) => ({
      ...prev,
      search: {
        ...prev.search,
        value: prev.search?.value ?? '',
        fields: newFields, // Accepts an array of fields now
      },
    }));
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
    searchFields,
    handleSearchFieldChange,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  };
}
