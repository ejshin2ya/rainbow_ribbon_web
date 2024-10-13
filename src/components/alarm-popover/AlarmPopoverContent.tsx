interface Props {
  tab: '예약' | '채팅';
}

export const AlarmPopoverContent = function ({ tab }: Props) {
  return (
    <div className="w-full h-[50px] flex-1 overflow-y-auto overflow-x-hidden">
      <div className="w-full h-[80px] flex flex-col py-[17px] px-[20px] items-start gap-[2px] border-b-[1px] border-b-reborn-gray0 text-reborn-gray8">
        <span className="max-w-full text-[16px] font-medium leading-[22px] truncate">
          김철수님의 채팅 메시지가 도착 했습니다.
        </span>
        <span className="text-[12px] font-normal leading-[22px]">
          오후 9:00
        </span>
      </div>

      <div className="w-full h-[80px] flex flex-col py-[17px] px-[20px] items-start gap-[2px] border-b-[1px] border-b-reborn-gray0 text-reborn-gray3">
        <span className="max-w-full text-[16px] font-medium leading-[22px] truncate">
          김철수철수님의 채팅 메시지가 도착 했습니다.
        </span>
        <span className="text-[12px] font-normal leading-[22px]">
          오전 10:32
        </span>
      </div>
    </div>
  );
};
