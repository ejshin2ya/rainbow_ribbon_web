import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';

export const CalendarDetail = function () {
  return (
    <CalendarContainer>
      <div className="w-full h-full font-semibold text-[14px] leading-[21px] text-reborn-gray3 mb-[12px]">
        오늘의 일정
      </div>
      <div className="w-full flex-shrink-0 flex flex-row justify-between">
        <div className="flex flex-row gap-[8px] items-end">
          <h1 className="font-semibold text-[28px] leading-[42px] text-reborn-gray8">
            4일
          </h1>
          <h2 className="font-semibold text-[13px] leading-[20px] text-reborn-gray4 align-text-bottom">
            목요일
          </h2>
        </div>
        <div className="h-full flex flex-row gap-[12px]">
          <button className="px-[14px] py-[10px]">예약 추가</button>
          <div>예약 제한</div>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locale="ko"
        events={[
          {
            title: '초롱이 (강아지) / 간단패키지',
            start: '2024-08-25T10:00:00',
            end: '2024-08-25T11:00:00',
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          },
          {
            title: '나비 (고양이) / 기본패키지',
            start: '2024-08-25T11:00:00',
            end: '2024-08-25T12:00:00',
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          },
          {
            title: '아롱이 (강아지) / 기본패키지',
            start: '2024-08-25T13:00:00',
            end: '2024-08-25T14:30:00',
            backgroundColor: 'orange',
            borderColor: 'orange',
          },
          // 추가 이벤트들...
        ]}
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
        // height="auto"
        slotMinTime="07:00:00"
        slotMaxTime="25:00:00"
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 400px;
  height: 900px;
  min-height: 710px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 30px 22px 17px;

  .fc {
    width: 100%;
    height: 50%;
    min-height: 850px;
    min-width: 80px;
  }
`;
