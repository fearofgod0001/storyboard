import { callApi } from '@/common/axios';

export const selectUserMenu = async ({ domainId }) => {
  return await callApi({
    url: '/api/v1/portal/user/menu/select',
    method: 'POST',
    data: { param: { DOMAIN_ID: domainId } },
  });
};

export const getUserMenuId = async () => {
  return await callApi({
    url: '/api/v1/portal/user/menu/menuid',
    method: 'POST',
    data: { param: {} },
  });
};

export const insertUserMenu = async (data) => {
  return await callApi({
    url: '/api/v1/portal/user/menu/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const selectAllDeptId = async (data) => {
  return await callApi({
    url: '/api/v1/portal/user/select/all/deptId',
    method: 'POST',
    data: { param: data },
  });
};

export const selectUserByDeptIdAndDomain = async (data) => {
  return await callApi({
    url: '/api/v1/portal/admin/user/selectUserByDeptIdAndDomain',
    method: 'POST',
    data: { param: data },
  });
};

export const selectUserName = async ({ USER_NAME }) => {
  return await callApi({
    url: '/api/v1/portal/user/select/username',
    method: 'POST',
    data: { param: { USER_NAME } },
  });
};

export const selectUser = async ({ PAGE_SIZE, CPAGE }) => {
  return await callApi({
    url: '/api/v1/portal/user/select',
    method: 'POST',
    data: { param: { PAGE_SIZE, CPAGE } },
  });
};

export const deleteUser = async (data) => {
  return await callApi({
    url: '/api/v1/portal/user/delete',
    method: 'POST',
    data: { param: data },
  });
};

export const insertUser = async (data) => {
  return await callApi({
    url: '/api/v1/portal/user/insert',
    method: 'POST',
    data: { param: data },
  });
};

export const updateUser = async (data) => {
  return await callApi({
    url: '/api/v1/portal/user/update',
    method: 'POST',
    data: { param: data },
  });
};
