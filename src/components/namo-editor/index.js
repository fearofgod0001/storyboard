import { useEffect, useRef, useState } from "react";
import StyledNamoEditor from "./styled";

export const NamoEditor = ({ src, sender, prntMessage }) => {
  const [iframeValue, setIframeValue] = useState();
  const [pageMode, setPageMode] = useState("V");
  const iframeRef = useRef(null);

  //iframe으로 메시지를 보낼 함수
  const sendMessageToIframe = (_message) => {
    const iframeWindow = iframeRef.current.contentWindow;
    const message = { type: "GREETING", data: _message };
    iframeWindow.postMessage(message, "*");
  };

  //iframe으로 보낼 state를 채우는 함수
  const onChangeValue = (e) => {
    setIframeValue(e.target.value);
  };

  //iframe에서 메시지를 받을 useEffect
  useEffect(() => {
    const receiveMessage = (event) => {
      if (sender === event.data.sender) {
        setIframeValue(event.data["targetNode"]);
      }
    };
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  //PageMode(readonly : boolean)을 변경할 함수
  const onChangePageMode = (_mode) => {
    setPageMode(_mode);
  };

  //pageMode가 바뀌면 bool 값을 iFrame으로 내려주어
  //iframe setReadOnly : boolean 값을 변경해준다
  useEffect(() => {
    if (pageMode === "V") {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage({ type: "pageMode", bool: false }, "*");
    } else if (pageMode === "E") {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage({ type: "pageMode", bool: true }, "*");
    }
  }, [pageMode]);

  // iframe 로딩 완료 시 메시지 보내는 함수
  const onIframeLoad = () => {
    sendMessageToIframe(prntMessage);
  };

  return (
    <StyledNamoEditor>
      <div className="header">
        {pageMode === "E" && (
          <button onClick={() => onChangePageMode("V")}>사용자 모드 </button>
        )}
        {pageMode === "V" && (
          <button onClick={() => onChangePageMode("E")}>관리자 모드 </button>
        )}
        <textarea onChange={onChangeValue} value={iframeValue}></textarea>
        <button onClick={() => sendMessageToIframe(iframeValue)}>
          내용 보내기
        </button>
      </div>

      <iframe src={src} id="namo" ref={iframeRef} onLoad={onIframeLoad} />
    </StyledNamoEditor>
  );
};
