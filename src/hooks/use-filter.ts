import { useMemo, useState } from 'react';

import type { TableRow } from '@/types';

type UseFilterResult = {
  filteredRows: TableRow[];
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const useFilter = (rows: TableRow[]): UseFilterResult => {
  const [searchValue, setSearchValue] = useState('');

  const filteredRows = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    return rows.filter((row) => {
      if (!normalizedSearchValue) {
        return true;
      }

      return [row.name, row.date, row.value.toString(), row.value.toLocaleString('ru-RU')].some(
        (value) => value.toLowerCase().includes(normalizedSearchValue),
      );
    });
  }, [searchValue, rows]);

  return {
    filteredRows,
    searchValue,
    setSearchValue,
  };
};
