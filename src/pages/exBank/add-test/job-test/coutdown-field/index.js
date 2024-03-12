import { useEffect, useState } from 'react';
import moment from 'moment';

const CountDownField = ({ form, action, onFinish }) => {
  const [timeleft, setTimeLeft] = useState();

  useEffect(() => {
    if (action === 'S') {
      const calculateEndTime = () => {
        // form에서 startDate와 시험 시간(runtime) 가져오기
        const startDate = form.getFieldValue('EX_START_DATE');
        const rtimeInMinutes = form.getFieldValue('EX_TEST_RUNTIME');
        if (!startDate) return;
        // endDate 계산
        let endDate = moment(startDate.format('YYYY-MM-DD HH:mm:ss')).add(rtimeInMinutes, 'minutes');

        return endDate;
      };

      const updateTimer = () => {
        const endDate = calculateEndTime();

        if (!endDate) return;

        // 현재 시간
        const now = moment();

        // 남은 시간 계산
        const duration = moment.duration(endDate.diff(now));

        // 남은 시간이 0 이하라면 타이머 중지
        if (duration.asSeconds() <= 0) {
          clearInterval(interval);
          setTimeLeft('00:00:00');
          form.submit();
          onFinish();
        } else {
          // 남은 시간을 HH:mm:ss 형식으로 설정
          setTimeLeft(
            duration.hours().toString().padStart(2, '0') +
              ':' +
              duration.minutes().toString().padStart(2, '0') +
              ':' +
              duration.seconds().toString().padStart(2, '0')
          );
        }
      };

      // 1초마다 updateTimer 함수를 호출하여 남은 시간 업데이트
      const interval = setInterval(updateTimer, 1000);

      // 컴포넌트 언마운트 시 인터벌 정리
      return () => clearInterval(interval);
    }
  }, [form, action, onFinish]); // form이 변경될 때마다 useEffect 내부 로직 재실행

  return (
    <div className="count-down" style={{ color: timeleft <= 60 ? 'red' : 'white', marginRight: 20, marginLeft: 5 }}>
      {timeleft}
    </div>
  );
};

export default CountDownField;
