import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDown.svg';

export const ReservationSection = function () {
  return (
    <div className="w-full h-[247px] flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        예약 정보
        <span className="text-reborn-orange3">*</span>
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">패키지</h2>

        <div className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1">
          <select className="w-full h-full outline-none appearance-none">
            <option>ㅎㅇ1</option>
            <option>ㅎㅇ2</option>
          </select>
          <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
            <ArrowDownIcon style={{ color: '#858583' }} />
          </label>
        </div>

        <div className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1">
          <select className="w-full h-full outline-none appearance-none">
            <option>옵션 선택</option>
            <option>ㅎㅇ2</option>
          </select>
          <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
            <ArrowDownIcon style={{ color: '#858583' }} />
          </label>
        </div>

        <h2 className="text-[14px] mt-[6px]">예약 시간</h2>
        <div className="w-full h-[46px] flex felx-row gap-[10px]">
          <div className="relative w-full h-full border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1">
            <select className="w-full h-full outline-none appearance-none">
              <option>00:00</option>
              <option>ㅎㅇ2</option>
            </select>
            <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
              <ArrowDownIcon style={{ color: '#858583' }} />
            </label>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            ~
          </div>
          <div className="relative w-full h-full border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1">
            <select className="w-full h-full outline-none appearance-none">
              <option>00:00</option>
              <option>ㅎㅇ2</option>
            </select>
            <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
              <ArrowDownIcon style={{ color: '#858583' }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
