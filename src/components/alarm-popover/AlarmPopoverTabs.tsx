import { useAlarmCount } from 'src/queries/alarm';

interface Props {
  tab: '예약' | '채팅';
  setReservation: () => void;
  setChat: () => void;
}

export const AlarmPopoverTabs = function ({
  setChat,
  setReservation,
  tab,
}: Props) {
  const isChat = tab === '채팅';
  const { data } = useAlarmCount();
  const bookingCount = data?.data.booking ?? 0;
  const chatCount = data?.data.chat ?? 0;
  return (
    <div className="w-full h-[50px] flex-shrink-0 flex flex-row relative">
      <div
        className={`flex-1 flex items-center justify-center flex-row gap-[4px]`}
        onClick={setReservation}
      >
        <span
          className={`font-medium text-[14px] leading-[30px] text-center duration-200 ${!isChat ? 'text-reborn-gray8' : 'text-reborn-gray4'}`}
        >
          예약
        </span>
        {!!bookingCount && (
          <span className="bg-reborn-orange3 text-reborn-white rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-medium text-[12px] leading-[18px] text-center p-[1px]">
            {bookingCount}
          </span>
        )}
      </div>
      <div
        className={`flex-1 flex items-center justify-center flex-row gap-[4px]`}
        onClick={setChat}
      >
        <span
          className={`font-medium text-[14px] leading-[30px] text-center duration-200 ${isChat ? 'text-reborn-gray8' : 'text-reborn-gray4'}`}
        >
          채팅
        </span>
        {!!chatCount && (
          <span className="bg-reborn-orange3 text-reborn-white rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-medium text-[12px] leading-[18px] text-center p-[1px]">
            {chatCount}
          </span>
        )}
      </div>
      <div
        className={`absolute bottom-0 right-0 w-full border-[1px] border-reborn-gray2`}
      />
      <div
        className={`absolute bottom-0 right-0 w-1/2 border-[1px] transition duration-200 border-reborn-gray8 ease-in-out ${isChat ? '' : '-translate-x-full'}`}
      />
    </div>
  );
};
