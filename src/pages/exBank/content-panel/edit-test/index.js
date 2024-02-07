import { useState, useCallback, useEffect } from "react";
import { TreeSelect, Input, Select, Form } from "antd";
import StyledButton from "@/component/styledElement/styled-button";

import StyldedEditQuestion from "./styled";
import MakeSaq from "@/component/make-saq";
import MakeMcq from "@/component/make-mcq";

const EditTest = ({
  exDataList,
  onSelectTreeNode,
  selectNodeId,
  onSubmit,
  onFinish,
  form,
}) => {
  const [dataSource, setDataSource] = useState(exDataList);
  const [exData, setExData] = useState();
  const [exType, setExType] = useState();
  const [exTitle, setExTitle] = useState();

  const makeRootNodes = useCallback(
    (inputList = [], rootId = 0, keyField, parentKeyField, titleField) => {
      const rootNodes = inputList?.filter((f) => f[parentKeyField] === rootId);
      const treeDatas = rootNodes.map((rootNode) => {
        const rootData = makeTreeData(
          inputList,
          rootNode.CODE_ID,
          rootNode,
          "CODE_ID",
          "PRNT_CODE_ID",
          "CODE_NM"
        );
        return rootData;
      });
      return treeDatas;
    },
    []
  );

  const makeTreeData = useCallback(
    (
      inputList = [],
      rootId = 0,
      rootNode,
      keyField,
      parentKeyField,
      titleField
    ) => {
      if (rootNode) {
        const makeChildren = (
          tree,
          parentIdx,
          keyField,
          parentKeyField,
          titleField
        ) => {
          const childrenList = tree.filter(
            (f) => f[keyField] !== rootId && f[parentKeyField] === parentIdx
          );
          if (childrenList.length > 0) {
            return childrenList.map((item) => ({
              key: item[keyField],
              title: item[titleField],
              value: item[keyField],
              children:
                makeChildren(
                  tree,
                  item[keyField],
                  keyField,
                  parentKeyField,
                  titleField
                ) || [],
            }));
          }
          return [];
        };
        return {
          key: rootNode[keyField],
          value: rootNode[keyField],
          title: rootNode[titleField],
          expanded: true,
          children:
            makeChildren(
              inputList,
              rootNode[keyField],
              keyField,
              parentKeyField,
              titleField
            ) || [],
        };
      }
      return {};
    },
    []
  );

  useEffect(() => {
    if (exDataList) {
      const tree = makeRootNodes(
        exDataList,
        -1,
        "CODE_ID",
        "PRNT_CODE_ID",
        "CODE_NM",
        false
      );
      setDataSource(tree);
    }
  }, [exDataList, makeTreeData, makeRootNodes]);

  useEffect(() => {
    if (selectNodeId && typeof selectNodeId === "object") {
      form.setFieldsValue({ CODE_ID: selectNodeId[0] });
    }
  }, [form, selectNodeId]);

  useEffect(() => {
    if (exData) {
      form.setFieldsValue({ EX_DATA: exData });
    }
  }, [form, exData]);

  const onChangeTreeSelect = (newValue) => {
    form.setFieldsValue({ CODE_ID: newValue });
    onSelectTreeNode(newValue);
  };

  const onChangeExType = (value) => {
    form.setFieldsValue({ EX_TYPE: value });
    setExType(value);
  };

  const onChangeExTitle = (e) => {
    form.setFieldsValue({ EX_TITLE: e.target.value });
    setExTitle(e.target.value);
  };

  const onHandleExData = (ques) => {
    console.debug("ques", ques);
    setExData({ ...exData, ...ques });
  };

  return (
    <StyldedEditQuestion>
      <Form.Item
        noStyle
        name="CODE_ID"
        rules={[
          {
            required: true,
            message: "분류체계를 설정해주세요",
          },
        ]}
      >
        <div className="create-classify-data">
          <div className="ex-header">분류체계 :</div>
          <TreeSelect
            showSearch
            value={selectNodeId}
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChangeTreeSelect}
            treeData={dataSource}
          />
        </div>
      </Form.Item>

      <Form.Item
        noStyle
        name="EX_TYPE"
        rules={[
          {
            required: true,
            message: "시험 타입을 설정해주세요",
          },
        ]}
      >
        <div className="create-ex-format">
          <div className="ex-header">유형 :</div>
          <div style={{ width: "100%" }}>
            <Select
              defaultValue={exType}
              style={{ width: 150 }}
              onChange={onChangeExType}
              options={[
                {
                  value: "SAQ",
                  label: "주관식",
                },
                {
                  value: "MCQ",
                  label: "객관식",
                },
              ]}
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item
        noStyle
        name="EX_TITLE"
        rules={[
          {
            required: true,
            message: "문제 제목을 설정해주세요",
          },
        ]}
      >
        <div className="create-ex-format">
          <div className="ex-header">제목 :</div>

          <Input onChange={onChangeExTitle} />
        </div>
      </Form.Item>

      <div className="change-setting">문제 설정</div>

      <Form.Item
        noStyle
        name="EX_DATA"
        rules={[
          {
            required: true,
            message: "문제를 입력해주세요",
          },
        ]}
      >
        {exType === "MCQ" && <MakeMcq onHandleExData={onHandleExData} />}
        {exType === "SAQ" && <MakeSaq onHandleExData={onHandleExData} />}
      </Form.Item>

      <div className="submit-btn">
        <StyledButton
          className="btn-primary btn-xs"
          onClick={(e) => {
            onSubmit();
            onFinish();
          }}
        >
          추가
        </StyledButton>
      </div>
    </StyldedEditQuestion>
  );
};

export default EditTest;
