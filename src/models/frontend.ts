import { ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  tNamespace: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onDeleteSelected?: (selectedRows: TData[]) => void;
  onSearch?: (value: string) => void;
  searchValue?: string;
}
