import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal as AntModal,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useTableModalStore } from '@/store/table-modal-store';
import { useTableRowsStore } from '@/store/table-rows-store';
import type { TableRow } from '@/types';

type FormValues = {
  date: dayjs.Dayjs;
  name: string;
  value: number;
};

export const Modal = () => {
  const [form] = Form.useForm<FormValues>();
  const closeModal = useTableModalStore((state) => state.closeModal);
  const editingRow = useTableModalStore((state) => state.editingRow);
  const isModalOpen = useTableModalStore((state) => state.isModalOpen);
  const addRow = useTableRowsStore((state) => state.addRow);
  const updateRow = useTableRowsStore((state) => state.updateRow);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      return;
    }

    if (editingRow) {
      form.setFieldsValue({
        date: dayjs(editingRow.date),
        name: editingRow.name,
        value: editingRow.value,
      });
      return;
    }

    form.resetFields();
  }, [editingRow, form, isModalOpen]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const nextValues: Omit<TableRow, 'key'> = {
      date: values.date.format('YYYY-MM-DD'),
      name: values.name.trim(),
      value: values.value,
    };

    if (editingRow) {
      updateRow({
        ...nextValues,
        key: editingRow.key,
      });
    } else {
      addRow(nextValues);
    }

    closeModal();
  };

  return (
    <AntModal
      cancelText="Отмена"
      forceRender
      okText={editingRow ? 'Сохранить' : 'Добавить'}
      onCancel={closeModal}
      onOk={handleSubmit}
      open={isModalOpen}
      title={editingRow ? 'Редактировать строку' : 'Добавить строку'}
    >
      <Form<FormValues> form={form} layout="vertical">
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            {
              required: true,
              message: 'Введите имя.',
            },
            {
              whitespace: true,
              message: 'Имя не может состоять только из пробелов.',
            },
          ]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
          label="Дата"
          name="date"
          rules={[
            {
              required: true,
              message: 'Выберите дату.',
            },
          ]}
        >
          <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Числовое значение"
          name="value"
          rules={[
            {
              required: true,
              message: 'Введите числовое значение.',
            },
          ]}
        >
          <InputNumber min={0} placeholder="Введите число" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </AntModal>
  );
};
