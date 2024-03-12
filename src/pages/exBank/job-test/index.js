import { ContentPannel } from '@/components';
import { Form, Modal, message, Popconfirm } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { useState, useCallback, useEffect } from 'react';
import { StyledButton, StyledModal } from '@/components/styledElement';
import { CloseCircleOutlined, SaveOutlined, EditOutlined, SendOutlined, PlayCircleOutlined } from '@ant-design/icons';
import {
  selectExTest,
  insertExQaGrade,
  insertExTestData,
  deleteExTestData,
  selectExTestList,
  updateExTestData,
  selectExQaGradeByExTestIdx,
  selectManualCategoryInfo,
} from '@/services/manual';

import dayjs from 'dayjs';
import moment from 'moment';
import uuid from 'react-uuid';
import StyledEditEtest from './styled';
import JobTestList from './jobtest-list';
import JobTestEdit from './jobtest-edit';
import CountDownField from './coutdown-field';
import TestResult from './test-result';

const AntModal = StyledModal(Modal);

const JobTest = ({}) => {
  const [form] = Form.useForm();
  const [exTreeData, setExTreeData] = useState();
  const [exList, setExList] = useState();
  const [selectEx, setSelectEx] = useState();
  const [pageMode, setPageMode] = useState();

  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);

  const [isOpenEdit, setIsOpenEdit] = useState();
  const [isOpenSelectItem, setOpenSelectItem] = useState();
  const [isOpenResult, setOpenResult] = useState();

  const [exColumn, setExColumn] = useState();
  const [startEx, setStartEx] = useState(false);

  const [resultList, setResultList] = useState();

  const [testQaOrgList, setTestQaOrgList] = useState();

  //시험창을 닫을 함수 onCancel
  const onCancel = useCallback(() => {
    setIsOpenEdit(false);
    setSelectEx();
    setAction();
    setPageMode();
    form.resetFields();
  }, []);

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

  //시험전체 리스트를 불러올 useQuery
  const {
    data: testList,
    isSuccess: isSuccessTestList,
    refetch: refetchTestList,
  } = useQuery('selectExTestList', selectExTestList);

  useEffect(() => {
    if (isSuccessTestList && testList) {
      const { exTestList } = testList;
      setExList(exTestList);
    }
  }, [isSuccessTestList, testList]);

  //선택한 시험지를 가져올 mutation
  const {
    mutate: mutateSelectEx,
    isSuccess: isSuccessSelectExTest,
    data: selectExData,
  } = useMutation('selectExTest', selectExTest);

  useEffect(() => {
    if (selectExData && isSuccessSelectExTest) {
      const { exData, testQa } = selectExData || {};
      setTestQaOrgList(testQa);
      //랜덤 여부를 확인한다.
      const isRnd = exData.EX_RANDOM === '1';
      //랜덤 문제일 때
      if (isRnd) {
        const getRandomIndex = (arr, count) => {
          const indexes = new Set();
          while (indexes.size < count) {
            const index = Math.floor(Math.random() * arr.length);
            indexes.add(index);
          }
          return Array.from(indexes);
        };
        // 랜덤으로 n개의 인덱스를 선택
        const randomIndexes = getRandomIndex(testQa, exData?.EX_RANDOM_CNT);
        // 선택된 인덱스에 해당하는 객체를 새로운 리스트에 담기
        const selectedTestQa = randomIndexes.map((index) => testQa[index]);
        form.setFieldsValue({ ...exData, EX_TEST_DATA: selectedTestQa, EX_RANDOM: true });
      } else {
        form.setFieldsValue({ ...exData, EX_TEST_DATA: testQa, EX_RANDOM: isRnd ? true : false });
      }
    }
  }, [form, isSuccessSelectExTest, selectExData]);

  useEffect(() => {
    if (pageMode === 'M') {
      form.setFieldsValue({ EX_TEST_DATA: testQaOrgList });
    }
  }, [form, pageMode, testQaOrgList]);

  //시험 데이터를 insert하는 mutation
  const { mutate: mutateInsertExTestData, isSuccess: isSuccessInsertExTestData } = useMutation(
    'insertExTestData',
    insertExTestData
  );

  useEffect(() => {
    if (isSuccessInsertExTestData) {
      refetchTestList();
      onCancel();
    }
  }, [isSuccessInsertExTestData, onCancel, refetchTestList]);

  //시험 데이터를 update mutation
  const { mutate: mutateUpdateExTestData, isSuccess: isSuccessUpdateExTestData } = useMutation(
    'updateExTestData',
    updateExTestData
  );

  useEffect(() => {
    if (isSuccessUpdateExTestData) {
      refetchTestList();
      onCancel();
      setAction();
    }
  }, [isSuccessUpdateExTestData, onCancel, refetchTestList]);

  //시험결과 데이터를 select하는 mutation
  const {
    mutate: mutateSelExGradeByTestIdx,
    isSuccess: isSuccessSelExGradeByTestIdx,
    data: selExGradeByTestIdxData,
  } = useMutation('selectExQaGradeByExTestIdx', selectExQaGradeByExTestIdx);

  useEffect(() => {
    if (isSuccessSelExGradeByTestIdx && selExGradeByTestIdxData) {
      const { list } = selExGradeByTestIdxData || {};
      setResultList(list);
    }
  }, [isSuccessSelExGradeByTestIdx, selExGradeByTestIdxData]);

  //시험지를 제출할 mutation
  const { mutate: mutateInsertExQaGrade, isSuccess: isSuccessInsertExQaGrade } = useMutation(
    'insertExQaGrade',
    insertExQaGrade
  );

  useEffect(() => {
    if (isSuccessInsertExQaGrade) {
      message.info('제출을 완료했습니다.');
      setStartEx(false);
      onCancel();
      setAction();
    }
  }, [isSuccessInsertExQaGrade, onCancel]);

  //시험 데이터를 delete하는 mutation
  const { mutate: mutateDelExTestData, isSuccess: isSuccessDelExTestData } = useMutation(
    'deleteExTestData',
    deleteExTestData
  );

  useEffect(() => {
    if (isSuccessDelExTestData) {
      refetchTestList();
      onCancel();
      setAction();
    }
  }, [isSuccessDelExTestData, onCancel, refetchTestList]);

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback(
    (record) => {
      const { EX_START_DATE } = record || {};
      const dayjsDate = dayjs(record.EX_START_DATE);
      form.setFieldsValue({ ...record, EX_START_DATE: dayjsDate });
      setPageMode('V');
      setSelectEx(record);
      setIsOpenEdit(true);

      const startDate = EX_START_DATE;
      if (startDate) {
        const now = moment();
        const startMoment = moment(startDate);

        const rtimeInMinutes = form.getFieldValue('EX_TEST_RUNTIME');
        const endDate = moment(startMoment).add(rtimeInMinutes, 'minutes');
        const duration = moment.duration(endDate.diff(now));

        // 현재 시간이 startDate보다 이후인지 비교
        if (now.isAfter(startMoment) && duration.asSeconds() > 0) {
          setStartEx(true);
        } else if (now.isAfter(startMoment) && duration.asSeconds() <= 0) {
          message.info('종료된 시험입니다.');
          setStartEx(false);
        } else {
          message.info('시험 시작 전입니다.');
          setStartEx(false);
        }
      }
    },
    [form]
  );

  useEffect(() => {
    if (selectEx) {
      mutateSelectEx(selectEx);
    }
  }, [mutateSelectEx, selectEx]);

  //페이지네이션 함수
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onCreateTest = (nowDate) => {
    setPageMode('N');
    setAction('N');
    setIsOpenEdit(true);
    form.setFieldsValue({ EX_RANDOM: false, EX_RANDOM_CNT: 0 });

    if (nowDate) {
      form.setFieldsValue({ EX_START_DATE: nowDate });
    }
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={() => onCreateTest()}>
        e-test 생성
      </StyledButton>
    );
  };

  //선택한 문제의 모달창을 열고 닫는 함수
  const onHandleSelectItem = (bool) => {
    setOpenSelectItem(bool);
  };

  //단 설정 하는 함수
  const onHandleColumn = (val) => {
    setExColumn(val);
  };

  const onChangeAction = (_action) => {
    setAction(_action);
    if (_action === 'D') {
      mutateDelExTestData(selectEx);
    }
  };

  const onFinishFailed = ({ __, errorFields }) => {
    message.error(errorFields.map((err, i) => (i === 0 ? err.errors : <div>{err.errors}</div>)));
  };

  const onFinish = useCallback(
    (info) => {
      if (info) {
        const { $y, $M, $D, $H, $m } = info?.EX_START_DATE || {};
        const exStrtDate = `${$y}-${$M + 1}-${$D} ${$H}:${$m}:00`;
        if (action === 'N') {
          const exTestIdx = uuid();
          //시험지 추가 로직
          mutateInsertExTestData({ ...info, EX_TEST_IDX: exTestIdx, EX_START_DATE: exStrtDate, EX_TEST_TYPE: 'J' });
        } else if (action === 'M') {
          //시험지 수정 로직
          mutateUpdateExTestData({ ...info, EX_START_DATE: exStrtDate });
        } else if (action === 'S') {
          // 답안 제출 로직
          mutateInsertExQaGrade({ ...info, USER_END_DATE: makeCurTime() });
        }
      }
    },
    [action, mutateInsertExQaGrade, mutateInsertExTestData, mutateUpdateExTestData]
  );

  const makeCurTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };

  const onStartExTest = (_action) => {
    if (startEx) {
      setAction(_action);
      form.setFieldsValue({ USER_START_DATE: makeCurTime(), EX_USER_ANSWER: {} });
    } else {
      message.info('시험시간이 아닙니다.');
    }
  };

  const onHandleShowResult = (bool, record) => {
    setOpenResult(bool);
    if (record) {
      setSelectEx(record);
      mutateSelExGradeByTestIdx(record);
    }
  };

  const onCancelShowResult = () => {
    setOpenResult(false);
    setSelectEx();
    form.resetFields();
  };

  return (
    <StyledEditEtest>
      <ContentPannel pathInfo={'출제 시험'} renderButton={renderButton}>
        <JobTestList
          cPage={cPage}
          exList={exList}
          exColumn={exColumn}
          pageSize={pageSize}
          totCount={totCount}
          onShowEdit={onShowEdit}
          onCreateTest={onCreateTest}
          onChangePage={onChangePage}
          onHandleShowResult={onHandleShowResult}
        />
        <AntModal
          className="modal-editor-full-screen"
          autoHeight
          title={
            <div className="modal-header">
              <div>출제 시험</div>
              <div style={{ display: 'flex' }}>
                {action === 'S' && pageMode === 'V' && (
                  <div style={{ display: 'flex' }}>
                    남은 시간 : <CountDownField action={action} form={form} onFinish={onFinish} />
                  </div>
                )}
                {['N', 'M'].includes(pageMode) && (
                  <StyledButton
                    className="btn-white btn-xs mr10"
                    onClick={() => {
                      form.submit();
                      onFinish();
                    }}
                  >
                    <SaveOutlined /> 저장
                  </StyledButton>
                )}
                {['M'].includes(pageMode) && (
                  <StyledButton
                    className="btn-white btn-xs mr10"
                    onClick={() => {
                      onChangeAction('D');
                    }}
                  >
                    <SaveOutlined /> 삭제
                  </StyledButton>
                )}
                {action === 'S' && pageMode === 'V' && (
                  <Popconfirm
                    title="제출하시겠습니까?"
                    placement="bottom"
                    onConfirm={() => {
                      form.submit();
                      onFinish();
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <StyledButton className="btn-white btn-xs mr10">
                      <SendOutlined /> 제출
                    </StyledButton>
                  </Popconfirm>
                )}
                {action !== 'S' && pageMode === 'V' && (
                  <StyledButton className="btn-white btn-xs mr10" onClick={() => onStartExTest('S')}>
                    <PlayCircleOutlined /> 시험 시작
                  </StyledButton>
                )}

                {['V'].includes(pageMode) && (
                  <StyledButton
                    className="btn-white btn-xs mr10"
                    onClick={() => {
                      setPageMode('M');
                      setAction('M');
                    }}
                  >
                    <EditOutlined />
                    수정
                  </StyledButton>
                )}

                <StyledButton className="btn-white btn-xs" onClick={onCancel}>
                  <CloseCircleOutlined />
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
          <JobTestEdit
            form={form}
            action={action}
            pageMode={pageMode}
            onFinish={onFinish}
            exColumn={exColumn}
            exTreeData={exTreeData}
            onFinishFailed={onFinishFailed}
            onHandleColumn={onHandleColumn}
            isOpenSelectItem={isOpenSelectItem}
            onHandleSelectItem={onHandleSelectItem}
          />
        </AntModal>
        <AntModal
          style={{ top: '30px' }}
          title="시험 결과 보기"
          open={isOpenResult}
          width={1000}
          footer={false}
          onCancel={onCancelShowResult}
        >
          <TestResult selectEx={selectEx} resultList={resultList} />
        </AntModal>
      </ContentPannel>
    </StyledEditEtest>
  );
};

export default JobTest;
