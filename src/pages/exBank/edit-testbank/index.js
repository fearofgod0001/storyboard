import { useQuery } from 'react-query';
import { ContentPannel } from '@/components';
import { Form, Modal, message } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { selectManualCategoryInfo } from '@/services/manual';
import { StyledButton, StyledModal } from '@/components/styledElement';

import uuid from 'react-uuid';
import StyledEditEtest from './styled';
import update from 'immutability-helper';
import TestBankList from './testbank-list';
import TestBankEdit from './testbank-edit';

const AntModal = StyledModal(Modal);

const exTestData = [
  {
    EX_IDX: 222,
    EX_DATA: {
      EX_DESCRIP: '다음 중 ‘예·적금’이 속하는 업무를 이르는 용어는?',
      EX_MCQ_LIST: ['여신', '수신', 'PB', '투자', '대출'],
      EX_ANSWER: 2,
      EX_EXPLAIN:
        '은행의 ‘수신(받을 수受 + 믿을 신信)’ 업무란 한자 뜻 그대로 고객으로부터 ‘신용을 받는 일’입니다. 고객이 은행을 믿고 돈을 맡기는 행위가 은행 입장에서는 신용을 받는 일이기 때문인데요. 고객이 예·적금 상품에 가입하거나 입출금 통장을 개설하는 대고객업무 등이 이에 해당합니다. 나아가 채권을 발행하거나 중앙은행의 은행권을 발행하는 것도 수신 업무에 포함됩니다.',
    },
  },
  {
    EX_IDX: 223,
    EX_DATA: {
      EX_DESCRIP: '‘여신’이라는 은행 용어의 유의어는?',
      EX_ANSWER: '대부',
      EX_EXPLAIN:
        '은행은 고객의 신용도를 검토하고 그에 맞는 대출금을 제공하죠. 개인 고객의 주택담보대출, 예·적금 담보대출, 기업 고객의 대출 등이 이에 속합니다. 대출 업무를 의미하는 여신이라는 용어는 ‘대부’라는 단어와 같은 의미로 자주 사용되는데요. ‘대부계’ 혹은 ‘여신계’ 직원은 이러한 대출 관련 업무를 하는 행원을 일컫습니다.',
    },
  },
  {
    EX_IDX: 224,
    EX_DATA: {
      EX_DESCRIP: '‘여신’이라는 은행 용어의 유의어는?',
      EX_ANSWER: '대부',
      EX_EXPLAIN:
        '은행은 고객의 신용도를 검토하고 그에 맞는 대출금을 제공하죠. 개인 고객의 주택담보대출, 예·적금 담보대출, 기업 고객의 대출 등이 이에 속합니다. 대출 업무를 의미하는 여신이라는 용어는 ‘대부’라는 단어와 같은 의미로 자주 사용되는데요. ‘대부계’ 혹은 ‘여신계’ 직원은 이러한 대출 관련 업무를 하는 행원을 일컫습니다.',
    },
  },
];

const exTestList = [
  {
    RNUM: 1,
    EX_TEST_IDX: 15933,
    EX_TEST_TITLE: '수신업무 고르기',
    EX_START_DATE: '2024-01-30T15:00:00.000+00:00',
    EX_TEST_RUNTIME: '60분',
    REG_USER_NM: '시스템관리자',
    EX_TEST_STATUS: '대기',
    MLC_PUB_DTTM: '2024-01-30T15:00:00.000+00:00',
  },
  {
    RNUM: 2,
    EX_TEST_IDX: 15943,
    EX_TEST_TITLE: '가게여신상품 설명하기',
    EX_START_DATE: '2024-01-30T15:00:00.000+00:00',
    EX_TEST_RUNTIME: '60분',
    REG_USER_NM: '이태석',
    EX_TEST_STATUS: '대기',
    MLC_PUB_DTTM: '2024-01-18T15:00:00.000+00:00',
  },
];

const EditTestBank = ({}) => {
  const [form] = Form.useForm();
  const [exTreeData, setExTreeData] = useState();
  const [_exList, setExList] = useState(exTestList);
  const [exItemList, setExItemList] = useState(exTestData);
  const [pageMode, setPageMode] = useState();

  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);

  const [isOpenEdit, setIsOpenEdit] = useState();
  const [isOpenSelectItem, setOpenSelectItem] = useState();

  const [exColumn, setExColumn] = useState();

  //분류체계를 불러올 useQuery
  const { data: treeData, isSuccess: isSuccessTreeData } = useQuery(
    'selectManualCategoryInfo',
    selectManualCategoryInfo
  );

  useEffect(() => {
    if (isSuccessTreeData && treeData) {
      const { list } = treeData;
      setExTreeData(list);
    }
  }, [isSuccessTreeData, treeData]);

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback((record) => {}, []);

  //페이지네이션 함수
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onCreateTest = () => {
    setPageMode('N');
    setIsOpenEdit(true);
  };

  const onCancel = () => {
    setIsOpenEdit(false);
  };

  //시험지 문제를 추가하는 함수

  const onAddTestItem = (item) => {
    if (item) {
      const exist = exItemList.some((f) => f.EX_IDX === item.EX_IDX);
      if (!exist) {
        setExItemList((prev) => {
          return update(prev, {
            $splice: [[exItemList.length, 0, item]],
          });
        });
        setOpenSelectItem(false);
      } else {
        message.error('동일한 문제가 존재합니다.');
      }
    }
  };

  //시험지 문제를 삭제하는 함수
  const onRemoveTestItem = (index, exIdx) => {
    setExItemList((prev) => {
      return update(prev, {
        $splice: [[index, 1]],
      });
    });
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={onCreateTest}>
        e-test 생성
      </StyledButton>
    );
  };

  const onDragEnd = (result) => {
    const { source } = result;
    const { destination } = result;

    if (!destination) {
      return;
    }

    setExItemList((prev) => {
      return update(prev, {
        $splice: [
          [source.index, 1],
          [destination.index, 0, { ...prev[source.index] }],
        ],
      });
    });
  };

  //선택한 문제의 모달창을 열고 닫는 함수
  const onHandleSelectItem = (bool) => {
    setOpenSelectItem(bool);
  };

  //단 설정 하는 함수
  const onHandleColumn = (val) => {
    setExColumn(val);
  };

  const onChangePageMode = (mode) => {
    setPageMode(mode);
  };

  const onChangeAction = (_action) => {
    setAction(_action);
  };

  const onFinishFailed = ({ __, errorFields }) => {
    message.error(errorFields.map((err, i) => (i === 0 ? err.errors : <div>{err.errors}</div>)));
  };

  const onFinish = useCallback(
    (info) => {
      if (info) {
        console.debug('info', info);
        if (action === 'N') {
          const exTestIdx = uuid();
          //시험지 추가 로직
          // mutateInsertExData({ ...info, EX_TEST_IDX: exTestIdx });
          setAction();
        } else if (action === 'M') {
          //기존 문제 수정 로직
          // mutateUpdateExData({ ...info });
          setAction();
        }
      }
    },
    [action]
  );

  return (
    <StyledEditEtest>
      <ContentPannel pathInfo={'출제 시험'} renderButton={renderButton}>
        <TestBankList
          cPage={cPage}
          exList={_exList}
          exColumn={exColumn}
          pageSize={pageSize}
          totCount={totCount}
          onShowEdit={onShowEdit}
          onChangePage={onChangePage}
        />
        <AntModal
          className="modal-editor-full-screen"
          autoHeight
          title={
            <div className="modal-header">
              <div>문제 은행</div>
              <div>
                <StyledButton
                  className="btn-white btn-xs mr10"
                  onClick={() => {
                    form.submit();
                    onFinish();
                  }}
                >
                  저장
                </StyledButton>
                <StyledButton className="btn-white btn-xs" onClick={onCancel}>
                  닫기
                </StyledButton>
              </div>
            </div>
          }
          open={isOpenEdit}
          onCancel={onCancel}
          footer={false}
          destroyOnClose
        >
          <TestBankEdit
            form={form}
            pageMode={pageMode}
            onFinish={onFinish}
            exColumn={exColumn}
            onDragEnd={onDragEnd}
            exItemList={exItemList}
            exTreeData={exTreeData}
            onAddTestItem={onAddTestItem}
            onFinishFailed={onFinishFailed}
            onHandleColumn={onHandleColumn}
            isOpenSelectItem={isOpenSelectItem}
            onRemoveTestItem={onRemoveTestItem}
            onHandleSelectItem={onHandleSelectItem}
          />
        </AntModal>
      </ContentPannel>
    </StyledEditEtest>
  );
};

export default EditTestBank;
