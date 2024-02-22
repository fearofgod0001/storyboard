import { callApi } from "@/common/axios";

export const selectManualTitle = async (data) => {
  return await callApi({
    url: "/api/v1/search/selectManualTitle",
    method: "POST",
    data: { param: data },
  });
};

export const insertNewVersionMlContentInfo = async (data) => {
  return await callApi({
    url: "/api/v1/manual/insertNewVersionMlContentInfo",
    method: "POST",
    data: { param: data },
  });
};

export const updateMlContentInfo = async (data) => {
  return await callApi({
    url: "/api/v1/manual/updateMlContentInfo",
    method: "POST",
    data: { param: data },
  });
};

export const deleteMlcContentInfoBymlcIdx = async (data) => {
  return await callApi({
    url: "/api/v1/manual/deleteMlcContentInfoBymlcIdx",
    method: "POST",
    data: { param: data },
  });
};

export const selectMlContentInfoHistoryBymlcOrgIdx = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectMlContentInfoHistoryBymlcOrgIdx",
    method: "POST",
    data: { param: data },
  });
};

export const selectMlCBymlcIdx = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectMlCBymlcIdx",
    method: "POST",
    data: { param: data },
  });
};

export const selectMlContentList = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectMlContentList",
    method: "POST",
    data: { param: data },
  });
};

export const insertManualRootCategory = async (data) => {
  return await callApi({
    url: "/api/v1/manual/insertManualRootCategory",
    method: "POST",
    data: { param: data },
  });
};

export const selectManualRootCategory = async () => {
  return await callApi({
    url: "/api/v1/manual/selectManualRootCategory",
    method: "POST",
    data: { param: {} },
  });
};

export const updateManualRootCategoryByRootCodeId = async (data) => {
  return await callApi({
    url: "/api/v1/manual/updateManualRootCategoryByRootCodeId",
    method: "POST",
    data: { param: data },
  });
};

export const selectManualCategoryInfo = async () => {
  return await callApi({
    url: "/api/v1/manual/selectManualCategoryInfo",
    method: "POST",
    data: { param: {} },
  });
};

export const insertManualCategoryInfo = async (data) => {
  return await callApi({
    url: "/api/v1/manual/insertManualCategoryInfo",
    method: "POST",
    data: { param: data },
  });
};
export const deleteCategoryRoot = async (data) => {
  return await callApi({
    url: "/api/v1/manual/deleteCategoryRoot",
    method: "POST",
    data: { param: data },
  });
};

export const insertManualCategoryInfoList = async ({ manualList }) => {
  return await callApi({
    url: "/api/v1/manual/insertManualCategoryInfoList",
    method: "POST",
    data: { param: { manualList } },
  });
};

export const selectCodeSec = async () => {
  return await callApi({
    url: "/api/v1/manual/selectCodeSec",
    method: "POST",
    data: { param: {} },
  });
};

export const selectManualInfoByMlcVerOrgIdx = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectManualInfoByMlcVerOrgIdx",
    method: "POST",
    data: { param: data },
  });
};

export const insertContentReqData = async (data) => {
  return await callApi({
    url: "/api/v1/manual/insertContentReqData",
    method: "POST",
    data: { param: data },
  });
};

export const selectContentReqDataByMlcIdx = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectContentReqDataByMlcIdx",
    method: "POST",
    data: { param: data },
  });
};

export const updateContReqDataByPosId = async (data) => {
  return await callApi({
    url: "/api/v1/manual/updateContReqDataByPosId",
    method: "POST",
    data: { param: data },
  });
};

export const selectExInfoList = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectExInfoList",
    method: "POST",
    data: { param: data },
  });
};

export const selectExData = async (data) => {
  return await callApi({
    url: "/api/v1/manual/selectExData",
    method: "POST",
    data: { param: data },
  });
};

export const insertExData = async (data) => {
  return await callApi({
    url: "/api/v1/manual/insertExData",
    method: "POST",
    data: { param: data },
  });
};

export const updateExData = async (data) => {
  return await callApi({
    url: "/api/v1/manual/updateExData",
    method: "POST",
    data: { param: data },
  });
};

export const deleteExData = async (data) => {
  return await callApi({
    url: "/api/v1/manual/deleteExData",
    method: "POST",
    data: { param: data },
  });
};
