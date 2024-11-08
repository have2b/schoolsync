'use client';

import { fetchData } from '@/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function usePagination<T>(url: string, initialPageSize = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: initialPageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['table-data', url, pagination.pageIndex, pagination.pageSize],
    queryFn: () => fetchData(url, pagination),
    placeholderData: true, // Show old data while fetching new data
  });

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPage,
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({
      pageIndex: 1, // Reset to first page when changing page size
      pageSize: newPageSize,
    });
  };

  return {
    data: data?.data ?? [],
    totalPages: data?.meta?.totalPages ?? 0,
    totalItems: data?.meta?.totalItems ?? 0,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isLoading,
    error,
    handlePageChange,
    handlePageSizeChange,
  };
}
