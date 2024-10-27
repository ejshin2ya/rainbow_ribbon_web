import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { FuneralEventProvider } from './store/event-store';
import { useConfirmDialog } from '../confirm-dialog/confitm-dialog-store';
import { useCalendarBookingList } from 'src/queries/reservation';
import { DatesSetArg } from '@fullcalendar/core';
import { BottomScheduler } from './BottomScheduler';

interface CalendarEvent {
  title: string;
  start: string;
  className: string;
}

export const Calendar = function () {
  const today = new Date();
  const [initial, setInitial] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const selectedMonth = useMemo(() => {
    return `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}`;
  }, [selectedDate]);
  const { setSelectedDate: updateDialogDate } = useConfirmDialog();
  const { data: calendarEvents, isFetching } =
    useCalendarBookingList(selectedMonth);

  const events = useMemo(() => {
    const reservations = calendarEvents?.data ?? [];
    const eventMap: Record<string, { request: number; confirmed: number }> = {};

    reservations
      .sort(
        (a, b) =>
          new Date(a.funeralStartDate).getTime() -
          new Date(b.funeralStartDate).getTime(),
      )
      .forEach(reservation => {
        const { bookingStatus, funeralStartDate } = reservation;
        const date = new Date(funeralStartDate);
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );

        if (!eventMap[newDate.toISOString()]) {
          eventMap[newDate.toISOString()] = { request: 0, confirmed: 0 };
        }

        if (bookingStatus === '결제 완료') {
          eventMap[newDate.toISOString()].request += 1; // 예약 대기
        } else if (bookingStatus === '예약 완료') {
          eventMap[newDate.toISOString()].confirmed += 1; // 예약 확정
        }
      });

    // 카운트된 데이터를 CalendarEvent 형식으로 변환
    const results: CalendarEvent[] = [];

    Object.entries(eventMap).forEach(([date, { request, confirmed }]) => {
      if (request > 0) {
        results.push({
          title: `예약 요청 ${request}건`,
          start: date,
          className: 'event-request',
        });
      }
      if (confirmed > 0) {
        results.push({
          title: `예약 ${confirmed}건`,
          start: date,
          className: 'event-confirmed',
        });
      }
    });

    return results;
  }, [calendarEvents]);

  const handleDateSet = function (dateInfo: DatesSetArg) {
    if (initial) return setInitial(false);
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
      <div className="w-full font-semibold leading-[21px] text-[14px] text-reborn-gray3 mb-[4px] flex flex-row items-center">
        월간 캘린더
        {isFetching && <div className="spinner ml-[8px] !w-[12px] !h-[12px]" />}
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
        displayEventTime={false}
      />
      <FuneralEventProvider
        events={
          calendarEvents?.data
            ?.filter(reservation => reservation.bookingStatus !== '예약 취소')
            .map(reservation => {
              const status =
                reservation.bookingStatus === '결제 완료'
                  ? '요청'
                  : reservation.bookingStatus === '예약 완료'
                    ? '확정'
                    : '취소';
              return {
                status: status,
                startDate: new Date(reservation.funeralStartDate),
                endDate: new Date(reservation.funeralEndDate),
                bookingId: reservation.bookingId,
                subTitle: `${reservation.petName} (${reservation.petType}) / ${reservation.packageName}`,
              };
            }) ?? []
        }
        selectedDate={selectedDate}
      >
        <BottomScheduler selectedDate={selectedDate} />
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
    min-width: 790px;
    /* max-width: 1400px; */
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

  .fc-prev-button.fc-button.fc-button-primary,
  .fc-next-button.fc-button.fc-button-primary,
  .fc-prev-button.fc-button.fc-button-primary:hover,
  .fc-next-button.fc-button.fc-button-primary:hover {
    background-color: #fff;
    color: #adadad;
    outline: none;
    border-color: #d6d6d6;
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
    .fc-daygrid-event-dot {
      border-color: #cc5228;
    }
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
    .fc-daygrid-event-dot {
      border-color: #238df7;
    }
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
