import { useState } from "react";
import update from "immutability-helper";
import TabPanel from "./tab-pannel";
import uuid from "react-uuid";

const init = {
  tabInfos: [
    {
      TAB_KEY: "tab1",
      LABEL: "주요내용",
      POS: 1,
    },
    {
      TAB_KEY: "dksldfjklsfdjdsk",
      LABEL: "no title",
      POS: 2,
    },
    {
      TAB_KEY: "tab3",
      LABEL: "FAQ",
      POS: 3,
    },
  ],

  tocList: {
    dksldfjklsfdjdsk: [{ test: 1 }],
    tab1: [
      {
        TOCID: 1,
        PRNT_TOCID: "root",
        TITLE: "1. 메인화면",
        INDENT: 1,
        COMPS: [
          {
            id: `edit_${uuid}`,
            compType: "edit",
          },
        ],
      },
      // {
      //   TOCID: 2,
      //   PRNT_TOCID: 1,
      //   TITLE: '2 접속방법',
      //   INDENT: 1,
      // },
      // {
      //   TOCID: 3,
      //   PRNT_TOCID: 2,
      //   TITLE: '3 메인화면',
      //   INDENT: 1,
      // },
      // {
      //   TOCID: 4,
      //   PRNT_TOCID: 1,
      //   TITLE: '4 메인333화면',
      //   INDENT: 1,
      // },
      // {
      //   TOCID: 5,
      //   PRNT_TOCID: 4,
      //   TITLE: '5 다국어지원',
      //   INDENT: 1,
      // },
      // {
      //   TOCID: 6,
      //   PRNT_TOCID: -1,
      //   TITLE: '6. 메뉴설명',
      //   INDENT: 1,
      // },
    ],
  },
  tocData: {
    //tab1  edit_${uuid}
    tab1: [{ ed: "dsl;MdFlaky;lsdflk;sdkf" }, { d: "dsl;MdFlaky;lsdflk;sdkf" }],
  },
};

const initTocItem = {
  TOCID: undefined,
  PRNT_TOCID: "root",
  TITLE: "no Title",
  INDENT: 1,
};

const Tab = () => {
  const [tabKey, setTabKey] = useState("tab1");
  const [content, setContent] = useState(init);
  const [selectIndex, setSelectIndex] = useState("all");

  const onTabChange = (key) => {
    setSelectIndex(key);

    setTabKey(key);
  };

  const onChangeTree = (sortTree) => {
    const { tocList } = content;
    const nTocList = sortTree.map((s) => {
      const nToc = tocList[tabKey].find((f) => String(f.TOCID) === s.key);
      return Object.assign(nToc, { PRNT_TOCID: s.prntId });
    });

    setContent((prev) =>
      update(prev, {
        tocList: {
          [tabKey]: { $set: [...nTocList] },
        },
      })
    );
  };

  const onCreateIndex = () => {
    const nToc = Object.assign(
      { ...initTocItem },
      { TOCID: uuid(), TITLE: uuid() }
    );
    setContent((prev) =>
      update(prev, {
        tocList: {
          [tabKey]: { $push: [nToc] },
        },
      })
    );
  };

  const tabAdd = (targetKey, action) => {
    const randomKey = uuid();
    const { tabInfos } = content;
    const addInitInfo = {
      TAB_KEY: randomKey,
      LABEL: "no title",
      POS: tabInfos.length + 1,
    };

    setContent((prev) =>
      update(prev, {
        tabInfos: { $push: [addInitInfo] },
        tocList: { $merge: { [randomKey]: [] } },
      })
    );
  };

  const tabRemove = (targetKey, action) => {
    const delTabInfos = content.tabInfos.findIndex(
      (f) => f.TAB_KEY === targetKey
    );
    //tocList객체 삭제
    delete content.tocList[targetKey];

    setContent((prev) =>
      update(prev, {
        tabInfos: { $splice: [[delTabInfos, 1]] },
      })
    );
  };

  const onChangeContent = (content) => {
    console.debug("content", content);
  };

  return (
    <div>
      <div className="tab-panel">
        <TabPanel
          tabInfos={content.tabInfos}
          onChange={onTabChange}
          tabAdd={tabAdd}
          tabRemove={tabRemove}
          selectIndex={selectIndex}
          setContent={setContent}
        />
      </div>
      <div className="content-panel"></div>
    </div>
  );
};

export default Tab;
