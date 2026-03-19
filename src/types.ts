import type { TableProps } from "antd";

export type TableRow = {
  date: string;
  key: string;
  name: string;
  value: number;
};

export type TableColumns = TableProps<TableRow>['columns'];
