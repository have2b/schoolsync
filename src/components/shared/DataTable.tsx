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
import { DownloadIcon, PlusIcon, SearchIcon, Trash2Icon, UploadIcon } from 'lucide-react';
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
  const t = useTranslations(tNamespace);

  return (
    <div className="space-y-4 rounded-md bg-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex w-1/3 items-center space-x-2">
          <SearchIcon className="size-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDeleteSelected?.(selectedRows)}
            disabled={selectedRows.length === 0}
          >
            <Trash2Icon className="mr-2 size-4" />
            Delete Selected
          </Button>
          <Button variant="outline" size="sm" onClick={onImport}>
            <UploadIcon className="mr-2 size-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <DownloadIcon className="mr-2 size-4" />
            Export
          </Button>
          <Button variant="default" size="sm" onClick={onAdd}>
            <PlusIcon className="mr-2 size-4" />
            Add New
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
                            t(headerTitle === '' ? 'title' : headerTitle),
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
