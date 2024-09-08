import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { CalendarDetail } from './CalendarDetail';
import { ReservationDetail } from './reservation-detail/ReservationDetail';
import { FuneralEventProvider } from './store/event-store';
import { useConfirmDialog } from '../confirm-dialog/confitm-dialog-store';
import { useCalendarBookingList } from 'src/queries/reservation';
import { DatesSetArg } from '@fullcalendar/core';

const events = [
  {
    title: '완료 건건',
    start: '2024-08-01',
    className: 'event-complete',
  },
  { title: '예약 건건', start: '2024-08-02', className: 'event-request' },
  {
    title: '예약 오전 3건',
    start: '2024-08-04',
    className: 'event-confirmed',
  },
  { title: '예약 건건', start: '2024-08-04', className: 'event-request' },
  {
    title: '예약 오전 2건',
    start: '2024-08-09',
    className: 'event-confirmed',
  },
  { title: '예약 2건', start: '2024-08-10', className: 'event-request' },
  {
    title: '예약 오전 2건',
    start: '2024-08-11',
    className: 'event-confirmed',
  },
  { title: '예약 2건', start: '2024-08-11', className: 'event-request' },
  {
    title: '예약 오전 2건',
    start: '2024-08-14',
    className: 'event-confirmed',
  },
  {
    title: '예약 오전 2건',
    start: '2024-08-22',
    className: 'event-confirmed',
  },
  {
    title: '예약 오전 2건',
    start: '2024-08-25',
    className: 'event-confirmed',
  },
  { title: '예약 2건', start: '2024-08-25', className: 'event-request' },
];

export const Calendar = function () {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const selectedMonth = useMemo(() => {
    return `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  }, [selectedDate]);
  const { setSelectedDate: updateDialogDate } = useConfirmDialog();
  const { data } = useCalendarBookingList(selectedMonth);
  data?.detail?.map(reservation => {
    return {
      status: reservation.bookingStatus,
      subTitle: '',
      startDate: new Date(reservation.funeralStartDate),
      endDate: new Date(reservation.funeralEndDate),
    };
  });

  const handleDateSet = function (dateInfo: DatesSetArg) {
    setSelectedDate(
      new Date(
        dateInfo.view.currentStart.getFullYear(),
        dateInfo.view.currentStart.getMonth(),
        dateInfo.view.currentStart.getDate(),
      ),
    );
  };

  useEffect(() => {
    updateDialogDate(selectedDate);
  }, [selectedDate]);

  return (
    <CalendarContainer>
      <div className="w-full font-semibold leading-[21px] test-[14px] text-reborn-gray3 mb-[4px]">
        월간 캘린더
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        allDayText="day"
        headerToolbar={{
          left: 'title,prev,next',
          center: '',
          right: '',
        }}
        dayMaxEventRows={3}
        dateClick={args => {
          setSelectedDate(args.date);
        }}
        dayCellClassNames={args => {
          const eventDate = `${args.date.getFullYear()}${args.date.getMonth()}${args.date.getDate()}`;
          const stateDate = `${selectedDate.getFullYear()}${selectedDate.getMonth()}${selectedDate.getDate()}`;
          if (eventDate === stateDate) {
            return ['truncate bg-reborn-orange0 selected-date'];
          }
          if ([0, 6].includes(args.date.getDay())) {
            return 'truncate bg-reborn-blue3 weekend-date';
          }
          return 'truncate bg-reborn-white weekday-date';
        }}
        events={events}
        dayCellContent={args => args.date.getDate()}
        datesSet={handleDateSet}
      />
      <FuneralEventProvider
        events={[
          {
            status: '확정',
            subTitle: '아롱이 (강아지) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              10,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              11,
              0,
            ),
          },
          {
            status: '요청',
            subTitle: '나비 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              13,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              14,
              30,
            ),
          },
          {
            status: '확정',
            subTitle: '으악 (강아지) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              14,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              16,
              0,
            ),
          },
          {
            status: '확정',
            subTitle: '으악2 (강아지) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              14,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              16,
              0,
            ),
          },
          {
            status: '요청',
            subTitle: '으악3 (강아지) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              14,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              21,
              0,
            ),
          },
          {
            status: '요청',
            subTitle: '헉 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              15,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              17,
              0,
            ),
          },
          {
            status: '요청',
            subTitle: '헉 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              15,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              21,
              0,
            ),
          },
          {
            status: '확정',
            subTitle: '헉 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              20,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              23,
              0,
            ),
          },
          {
            status: '확정',
            subTitle: '헉헉 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              20,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              23,
              0,
            ),
          },
          {
            status: '확정',
            subTitle: '헉헉헉 (고양이) / 기본패키지',
            startDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              20,
              0,
            ),
            endDate: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              23,
              0,
            ),
          },
        ]}
        selectedDate={selectedDate}
      >
        <BottomContainer>
          <CalendarDetail selectedDate={selectedDate} />
          <ReservationDetail />
        </BottomContainer>
      </FuneralEventProvider>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 710px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 30px 22px 17px;
  /* flex: 1; */
  /* overflow: scroll; */

  .selected-date {
    background-color: #fff9f7 !important;
    .fc-daygrid-day-number {
      border-radius: 100%;
      background-color: rgba(255, 102, 50, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
  .weekend-date {
    background-color: #f7f7f7 !important;
  }
  .weekday-date {
    background-color: #fff !important;
  }

  .fc {
    width: 100%;
    height: 100%;
    min-height: 1050px;
    min-width: 1133px;
  }
  .fc-toolbar-chunk {
    > div {
      display: flex;
      flex-direction: row;
      gap: 12px;
      align-items: center;

      > button {
        border-radius: 4px;
        background-color: #fff;
        color: rgba(173, 173, 173, 1);
        padding: 7.5px;
        border: solid rgba(214, 214, 214, 1) 1px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .fc-toolbar-title {
    font-weight: 600;
    font-size: 28px;
    line-height: 42px;
    color: rgba(24, 23, 23, 1);
  }

  .fc-col-header-cell {
    text-align: start;
  }

  .fc-col-header-cell.fc-day {
    color: rgba(133, 133, 131, 1);
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    padding: 8px;
  }

  .fc-daygrid-day-top {
    width: 100%;
    flex-direction: row;
    color: rgba(46, 46, 46, 1);
    font-size: 14px;
    line-height: 20px;
  }

  .fc-daygrid-day-frame {
    padding: 10px 16px;
    cursor: pointer;
    transition-duration: 0.2s;
  }
  .fc-daygrid-day-frame:hover {
    transition-duration: 0.2s;
    background-color: #f7f7f7;
  }

  .fc-daygrid-day-number {
    color: rgba(46, 46, 46, 1);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fc-daygrid-day.fc-day-today {
    background-color: unset;
  }

  .fc-day-sun,
  .fc-day-sat {
    background-color: rgba(247, 247, 247, 1);
  }

  .event-complete {
    width: 100%;
    border: none;
    border-radius: 4px;
    display: flex;
    border-left: solid 3px rgba(206, 206, 206, 1);
    background-color: #f7f7f7;
    padding: 6px;
    .fc-event-title {
      color: #858583;
    }
  }

  .event-request {
    width: 100%;
    border: none;
    border-radius: 4px;
    display: flex;
    border-left: solid 3px #fc9974;
    background-color: #fef6e7;
    padding: 6px;
    .fc-event-title {
      color: #cc5228;
    }
  }

  .event-confirmed {
    width: 100%;
    border: none;
    border-radius: 4px;
    display: flex;
    border-left: solid 3px #238df7;
    background-color: #e7f6fd;
    padding: 6px;
    .fc-event-title {
      color: #238df7;
    }
  }

  .fc-daygrid-day-events {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .fc-event-main,
  .fc-daygrid-event-harness,
  .fc-event,
  .fc-event-main-frame,
  .fc-event-title-container,
  .fc-event-title,
  .fc-sticky {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fc .fc-daygrid-day-frame {
    height: 1px;
    /* min-height: 132px; */
  }

  .fc-scroller,
  .fc-scroller-harness {
    overflow: visible;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
