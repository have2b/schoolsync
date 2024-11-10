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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { usePathname, useRouter } from '@/i18n/routing';
import { DataTableProps } from '@/types';
import { DownloadIcon, PlusCircleIcon, SearchIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function DataTable<TData, TValue>({
  columns,
  data,
  onImport,
  onExport,
  onDeleteSelected,
  onSearch,
  searchValue,
  tNamespace,
  searchFields,
  onSearchFieldChange,
  defaultKeys,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

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
          <div className="bottom-[1px] flex items-center justify-center rounded-lg border border-zinc-300 bg-zinc-300 transition-all focus-within:bg-white">
            <Input
              placeholder={t('common.searchPlaceholder')}
              className="rounded-e-none border-none focus-visible:outline-none focus-visible:ring-0"
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <Button variant="outline" className="rounded-s-none border-none">
              <SearchIcon className="size-4 text-gray-500" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={searchFields?.join(', ')}
              onValueChange={(value) => {
                const selectedFields = value.split(',').map((field) => field.trim());
                onSearchFieldChange?.(selectedFields); // Pass an array of selected fields
              }}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder={t(tNamespace.concat('.', 'name'))} />
              </SelectTrigger>
              <SelectContent>
                {defaultKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(tNamespace.concat('.', key))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Button variant="default" onClick={() => router.push(`${pathname}/add`)}>
            <PlusCircleIcon className="size-4" />
            {t('tableButtons.addNew')}
          </Button>
        </div>
      </div>
      <div className="rounded-md bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-black/10 hover:bg-black/10">
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
                  {t('common.noResult')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
