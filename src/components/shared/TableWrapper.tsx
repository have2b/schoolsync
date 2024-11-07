'use client';

import { handleDeleteSelected } from '@/actions';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TableWrapper<TData, TValue>({
  data,
  column,
}: {
  data: TData[];
  column: ColumnDef<TData, TValue>[];
}) {
  return (
    <DataTable
      columns={column}
      data={data}
      tNamespace="department"
      onDeleteSelected={handleDeleteSelected}
    />
  );
}
