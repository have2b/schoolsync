'use client';

import { handleDeleteSelected } from '@/actions';
import { DataTable } from './dataTable';
import { departmentColumn } from './departmentColumn';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DepartmentTable = ({ data }: { data: any[] }) => {
  console.log(typeof departmentColumn);

  return (
    <DataTable
      columns={departmentColumn}
      data={data}
      tNamespace="department"
      onDeleteSelected={handleDeleteSelected}
    />
  );
};
