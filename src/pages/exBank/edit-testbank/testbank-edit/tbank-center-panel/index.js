import { useEffect, useState } from 'react';
import { StyledModal } from '@/components/styledElement';
import { TitleField } from '@/components/form-fields';
import { Button, Empty, Modal } from 'antd';

import StyledTbankCenterPanel from './styled';
import ExItem from './ex-item';
import AddExItem from './add-ex-item';

const AntModal = StyledModal(Modal);

const TbankCenterPanel = ({
  exColumn,
  exItemList,
  onAddTestItem,
  isOpenSelectItem,
  onRemoveTestItem,
  onHandleSelectItem,
}) => {
  const [_exItemList, setExItemList] = useState();
  const [isOpenAddModal, setOpenAddModal] = useState();

  useEffect(() => {
    if (exItemList) {
      setExItemList(exItemList);
    }
  }, [exItemList]);

  const onHandleItemAddModal = () => {
    setOpenAddModal(true);
  };

  const onCancelItemAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <StyledTbankCenterPanel>
      <div className="cpanel-title">
        <TitleField placeholder="시험명을 입력해주세요" />
      </div>
      <div className="test-item">
        <div className="item-column">
          {_exItemList &&
            _exItemList.map((item, i) => {
              return <ExItem key={`${item.EX_IDX}`} item={item} index={i} onRemoveTestItem={onRemoveTestItem} />;
            })}
          <div className="empty-item">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={false}
            >
              <Button type="primary" onClick={onHandleItemAddModal}>
                문제 추가
              </Button>
            </Empty>
          </div>
        </div>
      </div>

      <AntModal
        style={{ top: '65px' }}
        title={'문제 추가'}
        onCancel={onCancelItemAddModal}
        width={1100}
        open={isOpenAddModal}
        footer={false}
        destroyOnClose
      >
        <AddExItem
          onAddTestItem={onAddTestItem}
          isOpenSelectItem={isOpenSelectItem}
          onHandleSelectItem={onHandleSelectItem}
        />
      </AntModal>
    </StyledTbankCenterPanel>
  );
};

export default TbankCenterPanel;
