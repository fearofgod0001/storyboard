import { useEffect, useState } from 'react';

const CountDownField = ({ form, action, onFinish }) => {
  const [timeleft, setTimeLeft] = useState();

  useEffect(() => {
    if (action === 'S') {
      //설정하 시간을 가져온다 (분 단위)
      const rtimeInMinutes = form.getFieldValue('EX_TEST_RUNTIME');
      const rtimeInSeconds = rtimeInMinutes * 60;
      setTimeLeft(rtimeInSeconds);

      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            if (onFinish) {
              form.submit();
              onFinish();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [action, form, onFinish]);

  // 시간:분:초 형식으로 변환
  const formatTimeLeft = () => {
    if (timeleft === null) return '00:00:00';

    const hours = Math.floor(timeleft / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeleft % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeleft % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="count-down" style={{ color: timeleft <= 60 ? 'red' : 'black' }}>
      {formatTimeLeft()}
    </div>
  );
};

export default CountDownField;
