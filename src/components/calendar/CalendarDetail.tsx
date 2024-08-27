import styled from 'styled-components';
import { EventSourceInput } from '@fullcalendar/core';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const events: EventSourceInput = [
  {
    title: '초롱이 (강아지) / 간단패키지',
    start: '2024-08-25T10:00:00',
    end: '2024-08-25T11:00:00',
    status: '확정',
  },
  {
    title: '나비 (고양이) / 기본패키지',
    start: '2024-08-25T11:00:00',
    end: '2024-08-25T12:00:00',
    status: '확정',
  },
  {
    title: '아롱이 (강아지) / 기본패키지',
    start: '2024-08-25T13:00:00',
    end: '2024-08-25T14:30:00',
    status: '요청',
  },
  {
    title: '샴1 (고양이) / 간단패키지',
    start: '2024-08-25T22:00:00',
    end: '2024-08-25T24:00:00',
    status: '확정',
  },
  {
    title: '샴2 (고양이) / 보통패키지',
    start: '2024-08-25T22:00:00',
    end: '2024-08-26T1:00:00',
    status: '확정',
  },
  {
    title: '으아악 (강아지) / 기본패키지',
    start: '2024-08-25T22:00:00',
    end: '2024-08-25T24:30:00',
    status: '요청',
  },
];

interface Props {
  selectedDate: Date;
}

export const CalendarDetail = function ({ selectedDate }: Props) {
  const dayParser = ['일', '월', '화', '수', '목', '금', '토'];
  const cols = [
    '오전 7시',
    '오전 8시',
    '오전 9시',
    '오전 10시',
    '오전 11시',
    '오후 12시',
    '오후 1시',
    '오후 2시',
    '오후 3시',
    '오후 4시',
    '오후 5시',
    '오후 6시',
    '오후 7시',
    '오후 8시',
    '오후 9시',
    '오후 10시',
    '오후 11시',
    '오전 12시',
  ];

  return (
    <CalendarContainer>
      <div className="w-full font-semibold text-[14px] leading-[21px] text-reborn-gray3 mb-[12px] flex-shrink-0">
        오늘의 일정
      </div>
      <div className="w-full flex-shrink-0 flex flex-row justify-between">
        <div className="flex flex-row gap-[8px] items-end">
          <h1 className="font-semibold text-[28px] leading-[42px] text-reborn-gray8">
            {`${selectedDate.getDate()}일`}
          </h1>
          <h2 className="font-semibold text-[13px] leading-[20px] text-reborn-gray4 align-text-bottom">
            {dayParser[selectedDate.getDay()]}
          </h2>
        </div>
        <div className="h-full flex flex-row gap-[12px]">
          <button className="px-[14px] py-[10px] border-[1px] border-reborn-gray2 rounded-[4px] flex felx-row gap-[8px] text-[12px] font-medium leading-[18px] text-reborn-gray4">
            <img width={15} height={15} alt="" src="" />
            예약 추가
          </button>
          <div className="px-[14px] py-[10px] border-[1px] border-reborn-gray2 rounded-[4px] flex felx-row gap-[8px] text-[12px] font-medium leading-[18px] text-reborn-gray4">
            <img width={15} height={15} alt="" src="" />
            예약 제한
          </div>
        </div>
      </div>

      <div className="grid__container grid grid-rows-36 grid-cols-[55px_1fr]">
        {/* <div className="top-0 left-[55px] right-0 bottom-0 bg-reborn-gray4 opacity-20">
          여기가 이벤트 영역
          <div className="absolute z-[2] left-0 right-0 top-[23px] opacity-100 text-reborn-gray8">
            이벤트 들어갈 것임.
          </div>
        </div> */}
        <div className="absolute min-h-[23px] z-[2] left-[55px] right-0 top-[23px] opacity-100 bg-reborn-blue0 rounded-[4px] border-l-reborn-blue1 border-l-[3px] text-reborn-blue2 font-medium text-[12px] leading-[18px]">
          이벤트 들어갈 것임. 높이랑 top은 inline style로, width는 left right로
          <div className="flex flex-row p-[3px]">
            <div className="flex-1">이거 시간</div>
            <div className="rounded-[4px] bg-reborn-blue0_1 text-reborn-blue2 px-[6px] py-[2px] w-[32px] h-[19px] text-[10px] font-medium leading-[18px] flex-shrink-0 text-center">
              확정
            </div>
          </div>
          <div className="flex flex-row p-[3px] ">
            <div className="flex-1">
              이름 / 패키지 배경 bg-reborn-yellow1 폰트 text-reborn-orange2_4
              왼쪽 보더 border-reborn-orange5
            </div>
            <div className="rounded-[4px] bg-reborn-yellow2 text-reborn-orange2_4 px-[6px] py-[2px] w-[32px] h-[19px] text-[10px] font-medium leading-[18px] flex-shrink-0 text-center">
              요청
            </div>
          </div>
        </div>
        {cols.map(title => {
          return (
            <>
              <div className="cell border-none pr-[8px] py-[4px]">{title}</div>
              <div className="cell right-cell border-t-[1px] border-t-reborn-gray1 border-b-reborn-gray0 border-b-[1px] border-r-[1px] border-r-reborn-gray1 border-l-[1px] border-l-reborn-gray1"></div>
              <div className="cell"></div>
              <div className="cell right-cell border-r-[1px] border-r-reborn-gray1 border-l-[1px] border-l-reborn-gray1"></div>
            </>
          );
        })}
      </div>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  flex: 1;
  min-width: 400px;
  width: 50%;
  height: 973px;
  min-height: 973px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 0px 22px 17px;

  .grid__container {
    width: 100%;
    height: 1;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 16px;
    /* background-color: red; */
    position: relative;
    > .cell {
      height: 23px;
      color: #71717a;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      text-align: right;
    }
    > .right-cell:last-child {
      border-bottom: 1px solid #ebebeb;
    }
  }
`;
