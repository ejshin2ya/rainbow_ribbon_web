import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { EventContentArg, EventSourceInput } from '@fullcalendar/core';

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

interface EventProps {
  args: EventContentArg & { [key: string]: any };
}

const EventComponent = function ({ args }: EventProps) {
  const status = args.event.extendedProps.status;
  const strongColor =
    status === '확정' ? 'bg-reborn-blue2' : 'bg-reborn-orange2_4';
  return (
    <div
      className={`w-full h-full relative rounded-[4px] flex flex-col py-[4px] pr-[6px] pl-[9px] ${status === '확정' ? 'bg-reborn-blue0 text-reborn-blue2' : 'bg-reborn-yellow1 text-reborn-orange2_4'}`}
    >
      <div className={`absolute left-0 top-0 h-full w-[3px] ${strongColor}`} />
      <div className="w-full flex flex-row text-[12px] leading-[18px] font-medium gap-[4px] content-between">
        <div className="flex-1">시간</div>
        <div
          className={`w-[30px] h-[19px] text-[10px] leading-[18px] font-medium rounded-4px px-[6px] py-[2px] ${status === '확정' ? 'bg-reborn-blue0_1' : 'bg-reborn-yellow2'}`}
        >
          {status}
        </div>
      </div>
      <div className="w-full text-ellipsis">{args.event.title}</div>
    </div>
  );
};

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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locale="ko"
        events={events}
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
        slotMinTime="07:00:00"
        slotMaxTime="25:00:00"
        dayHeaders={false}
        allDaySlot={false}
        height={1000}
        eventContent={args => {
          return <EventComponent args={args} />;
        }}
        eventOverlap={false}
        slotMinWidth={50}
        eventMaxStack={5}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  flex: 1;
  width: 50%;
  height: 900px;
  min-height: 710px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 0px 22px 17px;

  .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    width: 100%;
    height: 50%;
    min-height: 850px;
    min-width: 80px;
    background-color: transparent;
  }

  .fc-scrollgrid {
    /* height: 2000px; */
    border: none;
  }

  .fc-timegrid-slot-label {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    text-align: right;
    color: #71717a;
    border: none;
    min-width: 55px;
  }

  colgroup > col {
    min-width: 55px;
    border-top: none;
  }

  td {
    border: none;
  }

  .fc-timegrid-slot-lane {
    background-color: #fff;
    border: 1px solid #ebebeb;
    height: 23px;
  }

  .fc-timegrid-slot-minor {
    border-top: 1px solid #f7f7f7 !important;
  }

  td {
    border-right: 1px solid #ebebeb;
  }

  .fc-timegrid-slot.fc-timegrid-slot-label.fc-timegrid-slot-minor {
    border-top: none !important;
  }

  .fc-timegrid-col-frame {
    border-top: none;
  }

  .fc-timegrid-slot.fc-timegrid-slot-label.fc-timegrid-slot-minor::before {
    visibility: none;
    width: 0;
    height: 0;
  }
  .fc-timegrid-col-bg {
    border-top: 1px solid #ebebeb;
  }
  .fc-timegrid-slot.fc-timegrid-slot-lane.fc-timegrid-slot-minor::before {
    visibility: none;
    width: 0 !important;
    height: 0 !important;
    position: absolute;
  }

  .fc-event-main,
  .fc-timegrid-event-harness {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  a.fc-event {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }
`;
