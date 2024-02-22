import { callApi } from '@/common/axios';

export const selectGroupList = async (data) => {
  return await callApi({
    url: '/api/v1/portal/group/select',
    method: 'POST',
    data: { param: data },
  });
};

export const insertGroupList = async (data) => {
  return await callApi({
    url: '/api/v1/portal/group/insert',
    method: 'POST',
    data: { param: data },
  });
};
