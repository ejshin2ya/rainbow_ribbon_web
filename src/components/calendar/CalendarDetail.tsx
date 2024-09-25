import styled from 'styled-components';
import { createElement, Fragment, useMemo } from 'react';
import { useFuneralEventStore } from './store/event-store';
import { ReactComponent as PlusIcon } from '../../assets/Plus.svg';
import { ReactComponent as ClockIcon } from '../../assets/Clock.svg';
import { useConfirmDialog } from '../confirm-dialog/confitm-dialog-store';
import { useQuery } from '@tanstack/react-query';
import { getCompanyInfo } from 'src/services/companyService';
import { useAvailableHours } from 'src/queries/reservation';

interface Props {
  selectedDate: Date;
}

export interface EventProps {
  maxWidth?: number | string;
  width?: number | string;
  height?: number | string;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  subTitle?: string;
  status: string;
  startDate: Date;
  endDate: Date;
  bookingId?: string;
}

const EventItem = function ({
  status,
  subTitle,
  bottom,
  height,
  left = 55,
  maxWidth = '100%',
  right = 0,
  top = 0,
  width,
  startDate,
  endDate,
  bookingId,
}: EventProps) {
  const { changeSelectedEvent } = useFuneralEventStore();
  const boxColor =
    status === '요청'
      ? 'bg-reborn-yellow1 text-reborn-orange2_4 border-reborn-orange5'
      : status === '제한'
        ? 'bg-reborn-gray0 text-reborn-gray4 border-l-reborn-gray4'
        : 'bg-reborn-blue0 border-l-reborn-blue1 text-reborn-blue2';
  const buttonColor =
    status === '요청'
      ? 'bg-reborn-yellow2 text-reborn-orange2_4'
      : status === '제한'
        ? 'bg-reborn-gray1 text-reborn-gray4'
        : 'bg-reborn-blue0_1 text-reborn-blue2';
  const timeString = useMemo(() => {
    const startHour = ('0' + startDate?.getHours()).slice(-2);
    const startMinutes = ('0' + startDate?.getMinutes()).slice(-2);
    const endHour = ('0' + endDate?.getHours()).slice(-2);
    const endMinutes = ('0' + endDate?.getMinutes()).slice(-2);
    return `${startHour}:${startMinutes} ~ ${endHour}:${endMinutes}`;
  }, [startDate, endDate]);
  return (
    <div
      className={`absolute min-h-[46px] z-[2] left-[55px] right-0 top-[23px] opacity-100 rounded-[4px] border-l-[3px] font-medium text-[12px] leading-[18px] cursor-pointer ${boxColor}`}
      onClick={() => {
        if (bookingId) changeSelectedEvent(bookingId);
      }}
      style={{
        top,
        left,
        right,
        bottom,
        height,
        width,
        maxWidth,
      }}
    >
      <div className="flex flex-row h-[23px] px-[3px] items-center">
        <div className="flex-1 truncate">{timeString}</div>
        <div
          className={`rounded-[4px] px-[6px] py-[2px] w-[32px] h-[19px] text-[10px] font-medium leading-[18px] flex-shrink-0 text-center ${buttonColor}`}
        >
          {status}
        </div>
      </div>
      <div className={`flex flex-row h-[23px] px-[3px] items-center w-full`}>
        <div className="flex-1 truncate">{subTitle}</div>
      </div>
    </div>
  );
};

export const CalendarDetail = function ({ selectedDate }: Props) {
  const { processedEvents } = useFuneralEventStore();
  const { closeHandler, openBlockHandler } = useConfirmDialog();
  // TODO: company query 개발 시 해당 쿼리문으로 대체
  const { data } = useQuery({
    queryKey: ['company'],
    queryFn: () => {
      return getCompanyInfo().then(res => {
        return res;
      });
    },
  });
  const { data: timeBlockData } = useAvailableHours(
    data?.data?.id ?? '',
    selectedDate.toISOString().slice(0, 10),
  );

  const openConfirmBlockDialogHandler = function () {
    openBlockHandler(
      { text: '확인', onClick: () => closeHandler() },
      {
        text: '취소',
        onClick: () => {
          closeHandler();
        },
      },
    );
  };

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
            {['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]}
          </h2>
        </div>
        <div className="h-full flex flex-row gap-[12px]">
          <button className="px-[14px] py-[10px] border-[1px] border-reborn-gray2 rounded-[4px] flex felx-row gap-[8px] text-[12px] font-medium leading-[18px] text-reborn-gray4 duration-200 hover:bg-reborn-gray0 active:bg-reborn-gray1">
            <PlusIcon
              width={15}
              height={15}
              className="flex items-center justify-center"
            />
            예약 추가
          </button>
          <button
            className="px-[14px] py-[10px] border-[1px] border-reborn-gray2 rounded-[4px] flex felx-row gap-[8px] text-[12px] font-medium leading-[18px] text-reborn-gray4 duration-200 hover:bg-reborn-gray0 active:bg-reborn-gray1 items-center justify-center"
            onClick={openConfirmBlockDialogHandler}
          >
            <ClockIcon
              width={17}
              height={17}
              className="flex items-center justify-center"
            />
            예약 제한
          </button>
        </div>
      </div>

      <div className="grid__container grid grid-rows-36 grid-cols-[55px_1fr]">
        {timeBlockData?.data?.map((canBook, idx) => {
          if (canBook) return;
          const startDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            idx,
          );
          const endDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            idx + 1,
          );
          const height = 46;
          const top = (idx - 7) * 46;
          const width = `calc((100% - 55px))`;
          const left = '55px';
          return (
            <EventItem
              key={`event-block-${idx}`}
              status={'제한'}
              subTitle={'예약 제한'}
              startDate={startDate}
              endDate={endDate}
              height={height}
              top={top}
              left={left}
              width={width}
            />
          );
        })}
        {processedEvents.map((td, idx) => {
          if (selectedDate.toDateString() !== td.startDate.toDateString())
            return null;
          const diffDate = td.endDate.getTime() - td.startDate.getTime();
          const diffHours = diffDate / (1000 * 60 * 60);
          const height = diffHours * 46;
          const top = (td.startDate.getHours() - 7) * 46;
          const width = `calc((100% - 55px) / ${data?.data.parallel ?? 1})`;
          const left = `calc(55px + (100% - 55px) / ${data?.data.parallel ?? 1} * ${td.layer})`;

          return (
            <EventItem
              key={`event-${idx}`}
              status={td.status}
              subTitle={td.subTitle}
              startDate={td.startDate}
              endDate={td.endDate}
              height={height}
              top={top}
              left={left}
              width={width}
              bookingId={td.bookingId}
            />
          );
        })}

        {[
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
        ].map((title, idx) => {
          return createElement(Fragment, {
            children: (
              <>
                <div className="cell border-none pr-[8px] py-[4px]">
                  {title}
                </div>
                <div className="cell right-cell border-t-[1px] border-t-reborn-gray1 border-b-reborn-gray0 border-b-[1px] border-r-[1px] border-r-reborn-gray1 border-l-[1px] border-l-reborn-gray1"></div>
                <div className="cell"></div>
                <div className="cell right-cell border-r-[1px] border-r-reborn-gray1 border-l-[1px] border-l-reborn-gray1"></div>
              </>
            ),
            key: `${title}-idx`,
          });
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
