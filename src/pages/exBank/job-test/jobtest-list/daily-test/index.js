import React, { useCallback, useState } from 'react';
import { Calendar, Button, Select, message } from 'antd';

import StyledDailyTest from './styled';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const DailyTest = ({ _exist, onCreateTest }) => {
  //useQuery로 일일 테스트 정보를 가져옴

  //useMutate로 월이 바뀔 때마다 해당 월의 일일테스트를 가져옴

  const dateCellRender = (value) => {
    const { $W } = value ?? {};

    //서버시간으로 가져와야함
    const now = dayjs.utc().subtract(1, 'day');

    if (![0, 6].includes($W)) {
      if (value.isBefore(now)) {
        // _exist.map((exist, i) => {
        //   const existDate = dayjs.utc(exist.EX_START_DATE).format('YYYY-MM-DD');
        //   const valueDate = value.format('YYYY-MM-DD');
        //   console.debug('existDate', existDate);
        //   console.debug('valueDate', valueDate);
        //   if (existDate === valueDate) {
        //     return (
        //       <div className="events">
        //         <Button>결과보기</Button>
        //       </div>
        //     );
        //   }
        // });
      } else {
        return (
          <div className="events">
            <Button onClick={() => onCreateTest(value)}>문제등록</Button>
          </div>
        );
      }
    }
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
  };

  return (
    <StyledDailyTest>
      <Calendar
        cellRender={cellRender}
        fullscreen="false"
        mode="month"
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const months = [];

          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(`${current.$M + 1}월`);
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];

          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }

          return (
            <div>
              <Select
                style={{ width: 80, marginRight: 10 }}
                value={year}
                onChange={(newYear) => {
                  const now = value.clone().year(newYear);
                  onChange(now);
                }}
              >
                {options}
              </Select>

              <Select
                style={{ width: 80 }}
                value={month}
                onChange={(newMonth) => {
                  const now = value.clone().month(newMonth);
                  onChange(now);
                }}
              >
                {monthOptions}
              </Select>
            </div>
          );
        }}
      />
    </StyledDailyTest>
  );
};

export default DailyTest;
