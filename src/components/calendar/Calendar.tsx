import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

export const Calendar = function () {
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: '예약 요청 3건', date: '2024-01-04', color: '#ff9f89' },
          { title: '예약 2건', date: '2024-01-09', color: '#74b9ff' },
          { title: '완료 2건', date: '2024-01-01', color: '#dfe6e9' },
          // 원하는 다른 이벤트 추가
        ]}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;

  .fc .fc-daygrid-event {
    font-size: 14px;
    padding: 5px;
  }

  .fc .fc-daygrid-day-number {
    font-weight: bold;
  }
`;
