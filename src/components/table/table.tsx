import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Grid, Input, Table as AntTable, Typography } from 'antd';

import { useFilter } from '@/hooks/use-filter';
import { useTableModalStore } from '@/store/table-modal-store';
import { useTableRowsStore } from '@/store/table-rows-store';
import type { TableRow } from '@/types';
import { getColumns } from '@/utils/get-columns';

export const Table = () => {
  const screens = Grid.useBreakpoint();
  const deleteRow = useTableRowsStore((state) => state.deleteRow);
  const rows = useTableRowsStore((state) => state.rows);
  const { filteredRows, searchValue, setSearchValue } = useFilter(rows);
  const openCreateModal = useTableModalStore((state) => state.openCreateModal);
  const openEditModal = useTableModalStore((state) => state.openEditModal);
  const isMobile = !screens.md;

  const columns = getColumns({
    isMobile,
    onDelete: deleteRow,
    onEdit: openEditModal,
  });

  return (
    <div style={{ padding: isMobile ? 12 : 24 }}>
      <Card>
        <Flex gap="large" style={{ width: '100%' }} vertical align="flex-start">
          <div>
            <Typography.Title level={3}>Таблица записей</Typography.Title>
            <Typography.Text type="secondary">
              Добавляйте, редактируйте и удаляйте строки через модальное окно.
            </Typography.Text>
          </div>

          <Button icon={<PlusOutlined />} onClick={openCreateModal} type="primary">
            Добавить
          </Button>

          <Input.Search
            allowClear
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск по таблице"
            style={{ alignSelf: 'stretch', width: '100%' }}
            value={searchValue}
          />

          <AntTable<TableRow>
            columns={columns}
            dataSource={filteredRows}
            pagination={false}
            rowKey="key"
            scroll={{ x: 720 }}
            size={isMobile ? 'small' : 'middle'}
            style={{ alignSelf: 'stretch', width: '100%' }}
          />
        </Flex>
      </Card>
    </div>
  );
};
