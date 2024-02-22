import { callApi } from '@/common/axios';

export const selectAccountId = async () => {
  return await callApi({
    url: '/api/v1/portal/account/selectId',
    method: 'POST',
    data: { param: {} },
  });
};
