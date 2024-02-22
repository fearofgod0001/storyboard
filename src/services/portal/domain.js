import { callApi } from '@/common/axios';

export const selectDomain = async () => {
  return await callApi({
    url: '/api/v1/portal/domain/select',
    method: 'GET',
  });
};

export const insertDomain = async (data) => {
  return await callApi({
    url: '/api/v1/portal/domain/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const updateDomain = async (data) => {
  return await callApi({
    url: '/api/v1/portal/domain/update',
    method: 'POST',
    data: { param: data },
  });
};

export const deleteDomain = async (data) => {
  return await callApi({
    url: '/api/v1/portal/domain/delete',
    method: 'POST',
    data: { param: data },
  });
};
