import { callApi } from '@/common/axios';

export const selectManualCategoryInfo = async () => {
  return await callApi({
    url: '/api/v1/manual/selectManualCategoryInfo',
    method: 'POST',
    data: { param: {} },
  });
};

export const selectManualCategoryInfoBySearch = async (data) => {
  return await callApi({
    url: '/api/v1/manual/selectManualCategoryInfoBySearch',
    method: 'POST',
    data: { param: data },
  });
};

export const selectMlContentList = async (data) => {
  return await callApi({
    url: '/api/v1/manual/selectMlContentList',
    method: 'POST',
    data: { param: data },
  });
};
export const selectMlContentListBySearch = async (data) => {
  return await callApi({
    url: '/api/v1/manual/selectMlContentListBySearch',
    method: 'POST',
    data: { param: data },
  });
};

export const selectBoardList = async () => {
  // portal / src/main/java / com.rayful.portal.handler / BoardController.java
  return await callApi({
    url: '/api/v1/portal/board/select',
    method: 'POST',
    data: { param: {} },
  });
};

export const selectBoard = async ({ BBI_ID }) => {
  return await callApi({
    url: `/api/v1/portal/board/select/${BBI_ID}`,
    method: 'POST',
    data: { param: {} },
  });
};

export const selectMlRefInfoByMLC_IDX = async (data) => {
  // portal / src/main/java / com.rayful.portal.handler / ManualController.java
  return await callApi({
    url: `/api/v1/manual/selectMlRefInfoByMLC_IDX`,
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayBoardListByMultipleRB_ID = async (data) => {
  // portal / src/main/java / com.rayful.portal.handler / BoardController.java
  return await callApi({
    url: `/api/v1/portal/rayboard/selectRayBoardListByMultipleRB_ID`,
    method: 'POST',
    data: { param: data },
  });
};

export const selectListSearch = async (data) => {
  // portal / src/main/java / com.rayful.portal.handler / BoardController.java
  return await callApi({
    url: `/api/v1/portal/rayboard/selectListSearch`,
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayboardList = async (data) => {
  // portal / src/main/java / com.rayful.portal.handler / BoardController.java
  return await callApi({
    url: `/api/v1/portal/rayboard/selectList`,
    method: 'POST',
    data: { param: data },
  });
};

export const selectGroupMap = async (data) => {
  return await callApi({
    url: `/api/v1/portal/code/select/groupMap`,
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayboardContent = async (data) => {
  return await callApi({
    url: `/api/v1/portal/rayboard/select/content`,
    method: 'POST',
    data: { param: data },
  });
};

export const deleteRayboard = async (data) => {
  return await callApi({
    url: `/api/v1/portal/rayboard/delete`,
    method: 'POST',
    data: { param: data },
  });
};

export const updateRayboard = async (data) => {
  return await callApi({
    url: `/api/v1/portal/rayboard/update`,
    method: 'POST',
    data: { param: data },
  });
};

export const insertRayboard = async (data) => {
  return await callApi({
    url: `/api/v1/portal/rayboard/insert`,
    method: 'POST',
    data: { param: data },
  });
};

export const updateBoardList = async (data) => {
  return await callApi({
    url: '/api/v1/portal/board/update',
    method: 'POST',
    data: { param: data },
  });
};

export const insertBoardList = async (data) => {
  return await callApi({
    url: '/api/v1/portal/board/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const deleteBoardList = async (data) => {
  return await callApi({
    url: '/api/v1/portal/board/delete',
    method: 'POST',
    data: { param: data },
  });
};

export const insertRayBoardLike = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/like/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const deleteRayBoardLike = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/like/delete',
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayBoardLike = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/like/select',
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayBoardRate = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rate/select',
    method: 'POST',
    data: { param: data },
  });
};

export const insertRayBoardRate = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rate/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const deleteRayBoardRate = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rate/delete',
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayBoardRly = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rly/select',
    method: 'POST',
    data: { param: data },
  });
};

export const selectRayBoardRlyByUserNmEmpno = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rly/selectByUserNmEmpno',
    method: 'POST',
    data: { param: data },
  });
};

export const insertRayBoardRlyCotent = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rly/insert',
    method: 'POST',
    data: { param: data },
  });
};
export const updateRayBoardRly = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rly/update',
    method: 'POST',
    data: { param: data },
  });
};

export const deleteRayBoardRly = async (data) => {
  return await callApi({
    url: '/api/v1/portal/rayboard/rly/delete',
    method: 'POST',
    data: { param: data },
  });
};
