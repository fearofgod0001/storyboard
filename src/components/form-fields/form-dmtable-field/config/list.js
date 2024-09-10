import { Table, Input } from 'antd';
import { SettingOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { StyledList } from './styled';
import { StyledButton, StyledTable } from '@/components/styledElement';

const AntTable = StyledTable(Table);

export const List = ({ list, onRemove }) => {
  console.debug(' list ===>', list);
  const columns = [
    {
      title: '항목명',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
    },
    {
      title: 'accessorKey',
      dataIndex: 'accessorKey',
      key: 'accessorKey',
      align: 'center',
    },
    {
      title: '입력유형',
      dataIndex: 'component',
      key: 'component',
      width: '250px',
      align: 'center',
      render: (text) => (
        <div>
          <Input style={{ width: '200px' }} value={text} addonAfter={<SettingOutlined />} readOnly />
        </div>
      ),
    },
    {
      title: '설정값',
      align: 'center',
      key: 'config',
    },
    {
      title: '삭제',
      align: 'center',
      key: 'config',
      width: '100px',
      render: (_, row) => (
        <StyledButton className="btn-primary btn-xs" onClick={() => onRemove(row)}>
          <MinusSquareOutlined style={{ marginRight: '10px' }} />
          삭제
        </StyledButton>
      ),
    },
  ];
  return <AntTable columns={columns} dataSource={list.map((i, k) => ({ key: k, ...i }))} pagination={false} />;
};
