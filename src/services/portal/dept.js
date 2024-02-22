import { callApi } from '@/common/axios';

export const selectdeptlist = async () => {
  return await callApi({
    url: '/api/v1/portal/dept/selectdeptlist',
    method: 'POST',
    data: { param: {} },
  });
};

export const selectdeptadminlist = async () => {
  return await callApi({
    url: '/api/v1/portal/dept/admin/selectdeptlist',
    method: 'POST',
    data: { param: {} },
  });
};

export const insertdeptlist = async ({ deptList }) => {
  return await callApi({
    url: '/api/v1/portal/dept/insertdeptlist',
    method: 'POST',
    data: { param: { deptList } },
  });
};
