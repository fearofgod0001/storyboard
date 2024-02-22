import { callApi } from '@/common/axios';

export const selectDomain = async () => {
  return await callApi({
    url: '/api/v1/portal/domain/select',
    method: 'GET',
  });
};
