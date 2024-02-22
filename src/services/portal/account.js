import { callApi } from '@/common/axios';

export const selectAccountId = async () => {
  return await callApi({
    url: '/api/v1/portal/account/selectId',
    method: 'POST',
    data: { param: {} },
  });
};

export const SelectAccountInfoByAcntIds = async (data) => {
  return await callApi({
    url: '/api/v1/portal/account/selectAccountInfoByAcntIds',
    method: 'POST',
    data: { param: { ...data } },
  });
};
