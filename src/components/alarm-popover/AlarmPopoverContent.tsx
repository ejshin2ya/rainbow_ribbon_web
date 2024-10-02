import { useEffect, useMemo, useState } from 'react';
import { Alarm, useAlarmList } from 'src/queries/alarm';
import {
  conversionAlarmDate,
  conversionNormalDate,
} from 'src/utils/conversion';

interface Props {
  tab: '예약' | '채팅';
}

const AlarmItem = function ({ alarm, tab }: { alarm: Alarm } & Props) {
  const today = new Date();
  const date = new Date(alarm.createAt);
  return (
    <div className="w-full h-[80px] flex flex-col py-[17px] px-[20px] items-start gap-[2px] border-b-[1px] border-b-reborn-gray0 text-reborn-gray8">
      <span className="max-w-full text-[16px] font-medium leading-[22px] truncate">
        {`${alarm.userName}님의 ${tab} 메시지가 도착 했습니다.`}
      </span>
      <span className="text-[12px] font-normal leading-[22px]">오후 9:00</span>
    </div>
  );
};

export const AlarmPopoverContent = function ({ tab }: Props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [contents, setContents] = useState<Alarm[]>([]);
  const { data, isLoading } = useAlarmList(
    tab === '예약' ? 'BOOKING' : 'CHAT',
    page,
  );

  const parseHandler = function (info: Alarm) {
    switch (info.type) {
      case 'BOOKING_CANCELED':
        return `${info.userName}님이 장례 예약을 취소했습니다.`;
      case 'BOOKING_REQUEST':
        return `${conversionNormalDate(info.createAt)}에 장례 예약 요청이 있습니다.`;
      case 'MESSAGE':
      default:
        return `${info.userName}님의 채팅 메시지가 도착했습니다.`;
    }
  };

  useEffect(() => {
    setPage(0);
  }, [tab]);
  useEffect(() => {
    if (data) {
      setHasMore(!!data.data.hasMore);
      setContents(data.data.alerts);
    }
  }, [data]);
  return (
    <div className="w-full h-[50px] flex-1 overflow-y-auto overflow-x-hidden">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="spinner" />
        </div>
      ) : (
        !!data?.data.alerts.length &&
        data?.data.alerts.map(alarm => {
          return (
            <div
              className="w-full h-[80px] flex flex-col py-[17px] px-[20px] items-start gap-[2px] border-b-[1px] border-b-reborn-gray0 text-reborn-gray8"
              key={`${alarm.category}-${alarm.id}`}
            >
              <span className="max-w-full text-[16px] font-medium leading-[22px] truncate">
                {`${parseHandler(alarm)}`}
              </span>
              <span className="text-[12px] font-normal leading-[22px]">
                {conversionAlarmDate(alarm.createAt)}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};
