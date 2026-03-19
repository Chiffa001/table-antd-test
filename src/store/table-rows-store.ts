import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { TableRow } from '@/types';

type TableRowsStore = {
  addRow: (values: Omit<TableRow, 'key'>) => void;
  deleteRow: (key: string) => void;
  rows: TableRow[];
  updateRow: (row: TableRow) => void;
};

export const useTableRowsStore = create<TableRowsStore>()(
  persist(
    (set) => ({
      addRow: (values) =>
        set((state) => ({
          rows: [{ ...values, key: `${Date.now()}-${state.rows.length}` }, ...state.rows],
        })),
      deleteRow: (key) =>
        set((state) => ({
          rows: state.rows.filter((row) => row.key !== key),
        })),
      rows: [],
      updateRow: (nextRow) =>
        set((state) => ({
          rows: state.rows.map((row) => (row.key === nextRow.key ? nextRow : row)),
        })),
    }),
    {
      name: 'table-rows',
    },
  ),
);
