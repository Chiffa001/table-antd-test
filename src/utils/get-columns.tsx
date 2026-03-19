import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';

import type { TableColumns, TableRow } from '@/types';

type GetColumnsParams = {
  isMobile: boolean;
  onDelete: (key: string) => void;
  onEdit: (row: TableRow) => void;
};

export const getColumns = ({
  isMobile,
  onDelete,
  onEdit,
}: GetColumnsParams): TableColumns => [
  {
    dataIndex: 'name',
    key: 'name',
    sorter: (left, right) => left.name.localeCompare(right.name, 'ru'),
    title: 'Имя',
    width: isMobile ? 180 : undefined,
  },
  {
    dataIndex: 'date',
    key: 'date',
    render: (value: string) => dayjs(value).format('DD.MM.YYYY'),
    sorter: (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime(),
    title: 'Дата',
    width: isMobile ? 140 : undefined,
  },
  {
    dataIndex: 'value',
    key: 'value',
    render: (value: number) => value.toLocaleString('ru-RU'),
    sorter: (left, right) => left.value - right.value,
    title: 'Числовое значение',
    width: isMobile ? 180 : undefined,
  },
  {
    key: 'actions',
    render: (_, row) => (
      <Space>
        <Button
          aria-label={`Редактировать ${row.name}`}
          icon={<EditOutlined />}
          onClick={() => onEdit(row)}
        />
        <Popconfirm
          cancelText="Отмена"
          okText="Удалить"
          onConfirm={() => onDelete(row.key)}
          title="Удалить строку?"
        >
          <Button
            aria-label={`Удалить ${row.name}`}
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Space>
    ),
    title: 'Действия',
    width: isMobile ? 120 : undefined,
  },
];
