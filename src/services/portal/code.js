import { callApi } from '@/common/axios';

export const selectByCodeId = async ({ codeId }) => {
  return await callApi({
    url: '/api/v1/portal/code/selectByCodeId',
    method: 'POST',
    data: { param: { CODE_ID: codeId } },
  });
};

export const insertcodeAsSameLvl = async (data) => {
  return await callApi({
    url: '/api/v1/portal/code/insertcodeAsSameLvl',
    method: 'POST',
    data: { param: data },
  });
};

export const selectListByPrntId = async ({ CODE_PRNT_ID }) => {
  return await callApi({
    url: '/api/v1/portal/code/selectListByPrntId',
    method: 'POST',
    data: { param: { CODE_PRNT_ID } },
  });
};

export const selectListOrderbysubsq = async ({ CODE_RT_ID }) => {
  return await callApi({
    url: '/api/v1/portal/code/selectList/orderbysubsq',
    method: 'POST',
    data: { param: { CODE_RT_ID } },
  });
};

export const insertsubcodelist = async (data) => {
  return await callApi({
    url: '/api/v1/portal/code/insertsubcodelist',
    method: 'POST',
    data: { param: data },
  });
};

export const selectCodegrouplist = async ({ CODE_RT_IDS }) => {
  return await callApi({
    url: '/api/v1/portal/code/selectgrouplist',
    method: 'POST',
    data: { param: { CODE_RT_IDS } },
  });
};

export const selectCodeList = async ({ CODE_RT_ID }) => {
  return await callApi({
    url: '/api/v1/portal/code/selectList',
    method: 'POST',
    data: { param: { CODE_RT_ID } },
  });
};

export const insertcodelist = async (data) => {
  return await callApi({
    url: '/api/v1/portal/code/insertcodelist',
    method: 'POST',
    data: { param: data },
  });
};

export const selectCodeId = async (data) => {
  return await callApi({
    url: '/api/v1/manual/code/selectId',
    method: 'POST',
    data: { param: data },
  });
};
