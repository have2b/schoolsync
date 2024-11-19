'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { updateGrades } from '@/action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { useCrud } from '@/hooks';
import { cn } from '@/lib/utils';
import { Grade } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheckBigIcon,
  CircleXIcon,
  DownloadIcon,
  PlusCircleIcon,
  Search,
  Settings2,
  Trash2Icon,
  UploadIcon,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';
import { SearchStudent } from './SearchStudent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TableMeta<TData> {
  updateData: (rowIndex: number, columnId: string, value: number) => void;
  editedRows: Set<number>;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: string[];
  isLoading?: boolean;
  rosterName: string;
  showAddAndDelete?: boolean;
  showImportExport?: boolean;
  exportToExcel?: (rows: Row<TData>[]) => void;
}

// Custom filter function for global search across multiple columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalFilterFn: FilterFn<any> = (row, columnId, value) => {
  const search = value.toLowerCase();
  const cellValue = row.getValue(columnId)?.toString().toLowerCase();
  const regex = new RegExp(search.split(' ').join('.*'), 'i');
  return cellValue !== undefined && regex.test(cellValue);
};

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = ({ children, isActive, ...props }: PaginationButtonProps) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      className={cn(isActive && 'pointer-events-none')}
      {...props}
    >
      {children}
    </Button>
  );
};

const generatePaginationArray = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export function GradeTable<TData, TValue>({
  columns,
  data,
  searchableColumns = [],
  isLoading = false,
  rosterName,
  showAddAndDelete = true,
  showImportExport = true,
  exportToExcel,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'studentName',
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [columnSearches, setColumnSearches] = useState<Record<string, boolean>>({});
  const [tableData, setTableData] = useState<TData[]>(data);
  const [editedRows, setEditedRows] = useState<Set<number>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const t = useTranslations();
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    meta: {
      editedRows,
      updateData: (rowIndex: number, columnId: string, value: number) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              setEditedRows((prev) => new Set(prev).add(rowIndex)); // Track edited row
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    } as TableMeta<TData>,
  });

  const toggleColumnSearch = (columnId: string) => {
    setColumnSearches((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const clearFilters = () => {
    setGlobalFilter('');
    setColumnFilters([]);
    setColumnSearches({});
  };

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

  const { useBulkDelete } = useCrud({ modelName: 'grade' });
  const { mutate: bulkDeleteData } = useBulkDelete();

  const handleDelete = () => {
    bulkDeleteData(selectedRows.map((row) => (row as { id: number | string }).id.toString()));
    table.toggleAllRowsSelected(false);
  };

  const paginationSection = (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t('common.row.perPage')}</p>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-16 bg-white">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const { mutate: updateGradesMutation } = useMutation({
    mutationFn: updateGrades,
    onSuccess: () => {
      toast.success(t('common.status.updated'));
      setEditedRows(new Set()); // Clear edited rows after successful update
    },
    onError: (error) => {
      toast.error('Failed to update grades');
      console.error('Update error:', error);
    },
  });
  const handleSaveChanges = () => {
    const updatedRows = Array.from(editedRows).map((rowIndex) => {
      const row = tableData[rowIndex] as Grade;

      return {
        studentId: row.studentId,
        rosterId: row.rosterId,
        attendancePoint: Number(row.attendancePoint),
        midTermPoint: Number(row.midTermPoint),
        finalPoint: Number(row.finalPoint),
        finalGrade: Number(row.finalGrade),
        examPoint: Number(row.examPoint),
      };
    });

    updateGradesMutation(updatedRows);
  };

  return (
    <div className="w-full space-y-5 rounded-md bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-medium">{t('grade.title').concat(' ', rosterName)}</span>
        <div
          className={
            showImportExport ? 'flex items-center space-x-2 text-secondary-foreground' : 'hidden'
          }
        >
          <Button
            className="hover:text-secondary"
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <DownloadIcon className="size-6" />
            <span className="font-semibold">{t('table.actions.import')}</span>
          </Button>
          <Button
            className="hover:text-secondary"
            variant="outline"
            onClick={() => exportToExcel?.(table.getRowModel().rows)}
          >
            <span className="font-semibold">{t('table.actions.export')}</span>
            <UploadIcon className="size-6" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Global Search and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder={t('common.search.placeholder')}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="bg-zinc-100 pl-8 focus:bg-white"
              />
              {globalFilter && (
                <X
                  className="absolute right-2 top-2.5 size-4 cursor-pointer text-muted-foreground"
                  onClick={() => {
                    setGlobalFilter('');
                    const isAnyRowSelected = table.getSelectedRowModel().rows.length > 0;
                    table.toggleAllPageRowsSelected(!isAnyRowSelected);
                  }}
                />
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Settings2 className="mr-2 size-4" />
                  {t('common.filter.title')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <div className="mb-2 text-sm font-medium">{t('common.filter.toggleColumn')}</div>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {t('grade'.concat('.fields.', column.id, '.label'))}
                      </DropdownMenuCheckboxItem>
                    ))}
                  <Separator className="my-2" />
                  <div className="mb-2 text-sm font-medium">{t('common.filter.searchColumn')}</div>
                  {searchableColumns.map((columnId) => (
                    <DropdownMenuCheckboxItem
                      key={columnId}
                      checked={columnSearches[columnId]}
                      onCheckedChange={() => toggleColumnSearch(columnId)}
                    >
                      {`${t('common.search.title')} ${t('grade'.concat('.fields.', columnId, '.label')).toLowerCase()}`}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {(globalFilter || columnFilters.length > 0) && (
              <Button
                variant="ghost"
                onClick={() => {
                  clearFilters();
                  const isAnyRowSelected = table.getSelectedRowModel().rows.length > 0;
                  table.toggleAllPageRowsSelected(!isAnyRowSelected);
                }}
                className="h-8 px-2 lg:px-3"
              >
                {t('common.filter.clear')}
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              {t('common.row.selected', { row: table.getFilteredSelectedRowModel().rows.length })}
            </p>
            {paginationSection}
          </div>
        </div>

        {/* Individual Column Filters */}
        <div className="flex flex-wrap gap-2">
          {searchableColumns.map((columnId) => {
            const column = table.getColumn(columnId);
            if (!column) return null;

            return columnSearches[columnId] ? (
              <div key={columnId} className="flex items-center space-x-2">
                <Input
                  placeholder={`${t('common.search.title')} ${t('grade'.concat('.fields.', columnId, '.label')).toLowerCase()} ...`}
                  value={(column?.getFilterValue() as string) ?? ''}
                  onChange={(event) => column?.setFilterValue(event.target.value)}
                  className="h-8 w-48"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleColumnSearch(columnId)}
                  className="h-8 w-8 p-0"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <Button
                key={columnId}
                variant="outline"
                size="sm"
                onClick={() => toggleColumnSearch(columnId)}
                className="h-8"
              >
                {t('grade'.concat('.fields.', columnId, '.label'))}
              </Button>
            );
          })}
        </div>
        <div className={showAddAndDelete ? 'flex items-center justify-between' : 'hidden'}>
          <Button
            onClick={() => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())}
          >
            {table.getIsAllPageRowsSelected()
              ? t('table.actions.deselectAll')
              : t('table.actions.selectAll')}
          </Button>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={selectedRows.length === 0}>
                  <Trash2Icon className="size-4" />
                  {t('table.actions.deleteSelected')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center justify-center">
                    <CircleXIcon className="size-36 text-red-500" />
                  </div>
                  <AlertDialogTitle>{t('common.confirmation.title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('common.confirmation.deleteWarning', { row: selectedRows.length })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete()}>
                    {t('common.confirmation.accept')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button size="lg" onClick={() => setIsOpen(true)}>
              <PlusCircleIcon className="size-4" />
              {t('table.actions.addNew')}
            </Button>
            <Button
              size="lg"
              onClick={handleSaveChanges}
              className="bg-secondary hover:bg-secondary-foreground"
            >
              <CircleCheckBigIcon className="size-4" />
              {t('table.actions.save')}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={editedRows.has(row.index) ? 'bg-yellow-100' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="flex w-40 items-center justify-center text-sm font-medium">
          {t('common.row.showing', {
            row: table.getState().pagination.pageIndex + 1,
            total: table.getPageCount(),
          })}
        </div>
        <div className="flex items-center space-x-2">
          <PaginationButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
            {t('table.pagination.prev')}
          </PaginationButton>
          {generatePaginationArray(
            table.getState().pagination.pageIndex + 1,
            table.getPageCount()
          ).map((page, i) => (
            <React.Fragment key={i}>
              {typeof page === 'number' ? (
                <PaginationButton
                  onClick={() => table.setPageIndex(page - 1)}
                  isActive={table.getState().pagination.pageIndex + 1 === page}
                >
                  {page}
                </PaginationButton>
              ) : (
                <Button variant="outline" size="sm" className="pointer-events-none h-8 w-8">
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
          <PaginationButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {t('table.pagination.next')}
            <ChevronRight className="size-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </PaginationButton>
        </div>
      </div>

      <SearchStudent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
