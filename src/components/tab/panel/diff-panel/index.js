import { useState, useEffect } from "react";
import { StyledDiffPanel } from "./styled";
import { useMutation } from "react-query";
import IndexNumbringField from "../content-panel/center-panel/index-container/manual-index/index-numbering-field";
import update from "immutability-helper";
import HtmlDiff from "htmldiff-js";
import { FieldLoader } from "../content-panel/center-panel/item-fiels";

import {
  selectMlCBymlcIdx,
  selectManualInfoByMlcVerOrgIdx,
} from "../../../../services/manual";

const DiffPanel = ({
  mContent,
  tabKey,
  tocList,
  tocContentInfo,
  numberingList,
}) => {
  const { MLC_IDX, MLC_ORG_IDX, MLC_DATA, MLC_VERSION } = mContent;
  const [haldePosition, setHandlePosition] = useState();

  const [_tocList, setTocList] = useState();
  const [_tocContentInfo, setTocContentInfo] = useState();

  const [currentMlcIdx, setCurrnetMlcIdx] = useState();
  const [currentMlcData, setCurrentMlcData] = useState();

  const [compareMlcIdx, setCompareMlcIdx] = useState();
  const [compareMlcData, setCompareMlcData] = useState();
  const [comparemContent, setComparemContent] = useState();

  //선택한 MCL_IDX값의 DATA를 가져올 쿼리문
  const {
    mutate: mutateSelectMlcInfo,
    isSuccess: isSuccessSelectMlcInfo,
    data: selectMlcInfoData,
  } = useMutation("selectMlCBymlcIdx", selectMlCBymlcIdx);

  //클릭 후 compareMlcData 담을 useEffect
  useEffect(() => {
    if (selectMlcInfoData && isSuccessSelectMlcInfo && haldePosition) {
      const { MLC_DATA, MLC_TOCLIST, MLC_TOC_CONTENTINFO } =
        selectMlcInfoData.mlcInfo;

      if (haldePosition === "left") {
        setCurrentMlcData(MLC_DATA);
        setTocList(MLC_TOCLIST);
        setTocContentInfo(MLC_TOC_CONTENTINFO);
        //현재 오른쪽 데이터랑 비교해서 tocList와 tocContentInfo 업데이트 해야함
        onUpdatemContentData(
          comparemContent.MLC_TOCLIST,
          comparemContent.MLC_TOC_CONTENTINFO
        );
      } else if (haldePosition === "right") {
        setCompareMlcData(MLC_DATA);
        onUpdatemContentData(MLC_TOCLIST, MLC_TOC_CONTENTINFO);
      }
    }
  }, [selectMlcInfoData, isSuccessSelectMlcInfo]);

  //현재 버전의 -1 버전 DATA를 가져올 쿼리문
  const {
    mutate: mutateSelectManualInfoByVerOrgIdx,
    isSuccess: isSuccessSelectManualInfoByVerOrgIdx,
    data: selectManualInfoByVerOrgIdxData,
  } = useMutation(
    "selectManualInfoByMlcVerOrgIdx",
    selectManualInfoByMlcVerOrgIdx
  );

  //처음 들어오는 mContent를 이용하여
  useEffect(() => {
    if (
      selectManualInfoByVerOrgIdxData &&
      isSuccessSelectManualInfoByVerOrgIdx
    ) {
      const { MLC_DATA, MLC_IDX, MLC_TOCLIST, MLC_TOC_CONTENTINFO } =
        selectManualInfoByVerOrgIdxData;
      setCompareMlcData(MLC_DATA);
      setCompareMlcIdx(MLC_IDX);
      setComparemContent(selectManualInfoByVerOrgIdxData);
      onUpdatemContentData(MLC_TOCLIST, MLC_TOC_CONTENTINFO);
    }
  }, [selectManualInfoByVerOrgIdxData, isSuccessSelectManualInfoByVerOrgIdx]);

  // 처음 실행돼 값을 넣을 useEffect
  useEffect(() => {
    if (MLC_IDX && MLC_DATA) {
      setTocContentInfo(tocContentInfo);
      setTocList(tocList);
      setCurrnetMlcIdx(MLC_IDX);
      setCurrentMlcData(MLC_DATA);
      mutateSelectManualInfoByVerOrgIdx({
        MLC_ORG_IDX: MLC_ORG_IDX,
        MLC_VERSION: MLC_VERSION === 1 ? MLC_VERSION : MLC_VERSION - 1,
      });
    }
  }, []);

  //좌측 MLC 선택시 실행되는 함수
  const _onChangeleftIdx = (selectIdx) => {
    setCurrnetMlcIdx(selectIdx);
    setHandlePosition("left");
    mutateSelectMlcInfo({
      MLC_IDX: selectIdx,
    });
  };

  //우측 MLC 선택시 실행되는 함수
  const _onChangeRightIdx = (selectIdx) => {
    setCompareMlcIdx(selectIdx);
    setHandlePosition("right");
    mutateSelectMlcInfo({
      MLC_IDX: selectIdx,
    });
  };

  //tocList와 tocContent정보를 수정한다
  const onUpdatemContentData = (tocListData, tocContentInfoData) => {
    tocListData[tabKey].map((item, i) => {
      const inTocList = _tocList[tabKey].filter((f) => f.TOCID === item.TOCID);
      if (inTocList.length === 0) {
        setTocList((prev) =>
          update(prev, {
            [tabKey]: { $splice: [[i, 0, item]] },
          })
        );
      }
    });

    Object.keys(tocContentInfoData[tabKey]).forEach((key) => {
      if (!_tocContentInfo[tabKey].hasOwnProperty(key)) {
        setTocContentInfo((prev) =>
          update(prev, {
            [tabKey]: { $merge: { [key]: tocContentInfoData[tabKey][key] } },
          })
        );
      }
    });
  };

  return (
    <StyledDiffPanel>
      <div className="diff-modal-header">
        조문대비표
        <div className="diff-modal-close">
          <i class="fa-solid fa-xmark" style={{ color: "FFFFFF" }}></i>
        </div>
      </div>
      <div className="diff-modal-body">
        <div className="content-header">
          <div className="diff-select">
            <div className="diff-select-title">
              <i
                className="fa-regular fa-file-lines"
                style={{ marginRight: "5px" }}
              ></i>
              현재 버전
            </div>
            {/* <HistoryInfo
              mlcIdx={currentMlcIdx}
              mlcOrgIdx={MLC_ORG_IDX}
              onChangeManualPage={_onChangeleftIdx}
            /> */}
          </div>
          <div className="diff-select">
            <div className="diff-select-title">
              <i
                className="fa-regular fa-file-lines"
                style={{ marginRight: "5px" }}
              ></i>
              이전 버전
            </div>
            {/* <HistoryInfo
              mlcIdx={compareMlcIdx}
              mlcOrgIdx={MLC_ORG_IDX}
              onChangeManualPage={_onChangeRightIdx}
            /> */}
          </div>
        </div>

        {_tocList &&
          _tocList[tabKey].map((item, index) => {
            const marginLeft = item.INDENT * 15;

            let diffTitle = null;
            if (compareMlcData && currentMlcData) {
              if (compareMlcData[item.TOCID] && currentMlcData[item.TOCID]) {
                diffTitle = HtmlDiff.execute(
                  compareMlcData[item.TOCID],
                  currentMlcData[item.TOCID]
                );
              } else if (!compareMlcData[item.TOCID]) {
                diffTitle = currentMlcData[item.TOCID];
              } else if (!currentMlcData[item.TOCID]) {
                diffTitle = compareMlcData[item.TOCID];
              }
            }

            const curTitle = currentMlcData && currentMlcData[item.TOCID];
            const compTitle = compareMlcData && compareMlcData[item.TOCID];

            return (
              <div key={item.TOCID} className="content-body">
                <div className={`diff-content-${item.INDENT}`}>
                  <div className="diff-title">
                    <div className="diff-title-left">
                      <IndexNumbringField
                        numberingList={numberingList}
                        item={item}
                      />
                      {currentMlcData && currentMlcData[item.TOCID] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: compTitle
                              ? diffTitle
                              : `<ins>${curTitle}</ins>`,
                          }}
                          style={{ marginLeft: "3px" }}
                        />
                      )}
                    </div>
                    <div className="diff-title-right">
                      <IndexNumbringField
                        numberingList={numberingList}
                        item={item}
                      />
                      {compareMlcData && compareMlcData[item.TOCID] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: curTitle
                              ? diffTitle
                              : `<del>${compTitle}</del>`,
                          }}
                          style={{ marginLeft: "3px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {_tocContentInfo &&
                  _tocContentInfo[tabKey][item.TOCID].map((diffItem, i) => {
                    const curMlcData = currentMlcData
                      ? currentMlcData[diffItem.fieldId]
                      : undefined;
                    const compMlcData = compareMlcData
                      ? compareMlcData[diffItem.fieldId]
                      : undefined;

                    return (
                      <div className="diff-body" key={diffItem.fieldId}>
                        {currentMlcData &&
                          FieldLoader[diffItem.fieldComp]?.diffRenderer({
                            type: "cur",
                            diffItem,
                            curMlcData,
                            compMlcData,
                            marginLeft,
                          })}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </StyledDiffPanel>
  );
};

export default DiffPanel;
