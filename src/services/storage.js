import { callApi } from '@/common/axios';
import { downloadApi } from '@/common/axios';
import { configConsumerProps } from 'antd/es/config-provider';

export const deleteFileStorage = async (data) => {
  return await callApi({
    url: '/api/v1/storage/deleteFile',
    method: 'POST',
    data: { param: data },
  });
};

export const downloadFileStorage = async ({ fileDir, serverId, BBI_ID, RB_ID }) => {
  return await downloadApi({
    url: `/api/v1/storage/downLoadFile?fileDir=${fileDir}&serverId=${serverId}&BBI_ID=${BBI_ID}&RB_ID=${RB_ID}`,
    method: 'GET',
  })
    .then((response) => {
      console.debug('#### response ====>', response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;

      const extractDownloadFilename = (response) => {
        const disposition = response.headers['content-disposition'];
        const fileName = decodeURI(disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, ''));
        return fileName;
      };

      link.setAttribute('download', extractDownloadFilename(response));
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      alert('다운로드를 받을 수 없습니다.');
      console.debug(error);
    });
};
