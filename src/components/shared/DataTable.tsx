'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { DataTableProps } from '@/models';
import { DownloadIcon, PlusCircleIcon, SearchIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function DataTable<TData, TValue>({
  columns,
  data,
  onAdd,
  onImport,
  onExport,
  onDeleteSelected,
  tNamespace,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const t = useTranslations();

  return (
    <div className="flex flex-col space-y-4 rounded-md bg-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">
          {t('common.all').concat(` ${t(tNamespace.concat('.', 'title'))}`)}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onImport}>
            <UploadIcon className="size-4" />
            {t('tableButtons.import')}
          </Button>
          <Button variant="outline" onClick={onExport}>
            <DownloadIcon className="size-4" />
            {t('tableButtons.export')}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center rounded-sm border border-input px-3">
            <SearchIcon className="size-4 text-gray-400" />
            <Input
              placeholder={t('common.searchPlaceholder')}
              className="rounded-none border-none focus-visible:outline-none focus-visible:ring-0"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => table.toggleAllRowsSelected(!table.getIsAllRowsSelected())}
          >
            {table.getIsAllRowsSelected()
              ? t('tableButtons.deselectAll')
              : t('tableButtons.selectAll')}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={() => onDeleteSelected?.(selectedRows)}
            disabled={selectedRows.length === 0}
          >
            <Trash2Icon className="size-4" />
            {t('tableButtons.deleteSelected')}
          </Button>
          <Button variant="default" onClick={onAdd}>
            <PlusCircleIcon className="size-4" />
            {t('tableButtons.addNew')}
          </Button>
        </div>
      </div>
      <div className="rounded-md bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-black/10 hover:bg-black/20">
                {headerGroup.headers.map((header) => {
                  const headerTitle = header.column.columnDef.id;
                  return (
                    <TableHead
                      key={header.id}
                      className={`${headerTitle === 'action' ? 'text-right' : ''}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            t(tNamespace.concat('.', headerTitle === '' ? 'title' : headerTitle!)),
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-16 truncate">
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
    </div>
  );
}