import { create } from 'zustand';

import type { TableRow } from '@/types';

type TableModalStore = {
  closeModal: () => void;
  editingRow: TableRow | null;
  isModalOpen: boolean;
  openCreateModal: () => void;
  openEditModal: (row: TableRow) => void;
};

export const useTableModalStore = create<TableModalStore>((set) => ({
  isModalOpen: false,
  editingRow: null,
  closeModal: () =>
    set({
      editingRow: null,
      isModalOpen: false,
    }),
  openCreateModal: () =>
    set({
      editingRow: null,
      isModalOpen: true,
    }),
  openEditModal: (row) =>
    set({
      editingRow: row,
      isModalOpen: true,
    }),
}));
