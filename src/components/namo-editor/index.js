import { useEffect, useRef, useState } from "react";
import StyledNamoEditor from "./styled";

export const NamoEditor = ({ src, sender }) => {
  const [iframeValue, setIframeValue] = useState();
  const [pageMode, setPageMode] = useState("V");
  const iframeRef = useRef(null);
  //iframe으로 메시지를 보낼 함수
  const sendMessageToIframe = () => {
    const iframeWindow = iframeRef.current.contentWindow;
    const message = { type: "GREETING", data: iframeValue };
    iframeWindow.postMessage(message, "*");
  };

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

  const onChangePageMode = (_mode) => {
    setPageMode(_mode);
  };

  useEffect(() => {
    if (pageMode === "V") {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage({ type: "pageMode", bool: false }, "*");
    } else if (pageMode === "E") {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage({ type: "pageMode", bool: true }, "*");
    }
  }, [pageMode]);

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
        <button onClick={sendMessageToIframe}>내용 보내기</button>
      </div>

      <iframe src={src} id="namo" ref={iframeRef} />
    </StyledNamoEditor>
  );
};
