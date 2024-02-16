import { useState, useCallback } from 'react';
import { ContentPannel } from '@/components';
import { Form, Modal } from 'antd';
import { StyledButton, StyledModal } from '@/components/styledElement';
import StyledEditEtest from './styled';
import TestBankList from './testbank-list';
import TestBankEdit from './testbank-edit';

const AntModal = StyledModal(Modal);

const eTestList = [
  {
    RNUM: 1,
    CODE_ID: 227,
    EX_IDX: 15933,
    T_TITLE: '수신업무 고르기',
    T_START_DATE: '2024-01-30T15:00:00.000+00:00',
    T_TIME: '60분',
    REG_USER_NM: '시스템관리자',
    T_STATUS: '대기',
    MLC_PUB_DTTM: '2024-01-30T15:00:00.000+00:00',
  },
  {
    RNUM: 2,
    CODE_ID: 229,
    T_IDX: 15943,
    T_TITLE: '가게여신상품 설명하기',
    T_START_DATE: '2024-01-30T15:00:00.000+00:00',
    T_TIME: '60분',
    REG_USER_NM: '이태석',
    T_STATUS: '대기',
    MLC_PUB_DTTM: '2024-01-18T15:00:00.000+00:00',
  },
];

const EditTestBank = ({}) => {
  const [form] = Form.useForm();

  const [isOpenEdit, setIsOpenEdit] = useState();

  const [_eTestList, setETestList] = useState(eTestList);
  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback((record) => {}, []);

  //페이지네이션 함수
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onCreateTest = () => {
    setIsOpenEdit(true);
  };

  const onCancel = () => {
    setIsOpenEdit(false);
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={onCreateTest}>
        e-test 생성
      </StyledButton>
    );
  };

  return (
    <StyledEditEtest>
      <ContentPannel pathInfo={'문제 은행'} renderButton={renderButton}>
        <TestBankList
          cPage={cPage}
          pageSize={pageSize}
          totCount={totCount}
          eTestList={_eTestList}
          onShowEdit={onShowEdit}
          onChangePage={onChangePage}
        />
        <AntModal
          className="modal-editor-full-screen"
          autoHeight
          title={
            <div className="modal-header">
              <div>문제 은행</div>
              <div>닫기 </div>
            </div>
          }
          open={isOpenEdit}
          onCancel={onCancel}
          footer={false}
          destroyOnClose
        >
          <TestBankEdit />
        </AntModal>
      </ContentPannel>
    </StyledEditEtest>
  );
};

export default EditTestBank;
