'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useTableData } from '@/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../DataTable';

interface PaginatedTableProps<TData, TValue> {
  url: string;
  columns: ColumnDef<TData, TValue>[];
  tNamespace: string;
  initialPageSize?: number;
  searchFields?: string[];
  defaultSort?: Array<{
    field: keyof TData;
    order: 'asc' | 'desc';
  }>;
  defaultKeys: string[];
}

export function PaginatedTable<TData, TValue>({
  url,
  columns,
  tNamespace,
  initialPageSize = 10,
  searchFields = ['name'],
  defaultSort = [{ field: 'name' as keyof TData, order: 'asc' }],
  defaultKeys,
}: PaginatedTableProps<TData, TValue>) {
  const {
    data,
    totalPages,
    pageIndex,
    pageSize,
    handleSearch,
    searchValue,
    handlePageChange,
    handlePageSizeChange,
    handleSearchFieldChange,
  } = useTableData<TData>({ url, initialPageSize, searchFields, defaultSort });

  const pageSizeOptions = [10, 20, 30, 50];

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const addPage = (page: number) => pages.push(page);
    const addEllipsis = () => pages.push('ellipsis');

    addPage(1);

    if (pageIndex! > 3) addEllipsis();

    for (let i = Math.max(2, pageIndex! - 1); i <= Math.min(totalPages - 1, pageIndex! + 1); i++) {
      addPage(i);
    }

    if (pageIndex! < totalPages - 2) addEllipsis();

    if (totalPages > 1) addPage(totalPages);

    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end space-x-2">
        <span className="text-sm text-gray-500">Rows per page:</span>
        <Select
          value={pageSize!.toString()}
          onValueChange={(value) => handlePageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data}
        tNamespace={tNamespace}
        onSearch={handleSearch}
        searchValue={searchValue}
        // searchFields={searchFields}
        defaultKeys={defaultKeys}
        onSearchFieldChange={handleSearchFieldChange}
      />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(pageIndex! - 1)}
              className={
                pageIndex === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-zinc-200'
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index} className="cursor-pointer">
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === pageIndex}
                  onClick={() => handlePageChange(page)}
                  className={page === pageIndex ? '' : 'hover:bg-zinc-200'}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(pageIndex! + 1)}
              className={
                pageIndex === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-zinc-200'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
