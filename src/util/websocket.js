function onOpen(evt, ws) {
  ws.send('{"rqtype":"getknoxsso","token":"","data":"KCPCCTRAY0001"}');
}

function onMessage(evt, ws) {
  ws.close();
  var userinfo = JSON.parse(JSON.parse(evt.data)["data"])["userInfo"];
  var key = JSON.parse(JSON.parse(evt.data)["data"])["key"];

  return { userinfo: userinfo, key: key };
}

function onClose() {
  console.debug(" 연결 종료");
}

function onError(evt, ws) {
  ws.close();
  var errorCode = JSON.parse(JSON.parse(evt.data)["data"])["errorCode"];
  alert(
    "[" +
      errorCode +
      " ERROR] Knox Portal에 로그인해 주세요.\n(지속적인 ERROR 발생시 담당자에게 문의하세요.)"
  );
  return;
}

export function webSoket(uri, options) {
  const ws = new WebSocket("wss://localhost:29283");
  ws.onopen = (evt) => onOpen(evt, ws);
  ws.onmessage = (evt) => onMessage(evt, ws);
  ws.onclose = () => onClose();
  ws.onerror = (evt) => onError(evt, ws);
}

//--------------다른 페이지에서 ssoCheck 부르는 법
// import { useQueryClient } from 'react-query';

// const queryClient = useQueryClient();
//어떠한 행동을 해서 isSuccess가 발생하면 ssoCheck 재실행
// useEffect(() => {
//     if (isSuccess) {
//       queryClient.resetQueries({ queryKey: ['authSsoCheck'] });
//     }
//   }, [isSuccess]);
