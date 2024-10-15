import { FormSelect } from './FormSelect';

export const ReservationSection = function () {
  return (
    <div className="w-full h-[247px] flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        예약 정보
        <span className="text-reborn-orange3">*</span>
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">패키지</h2>

        <FormSelect name="package" placeHolder="패키지 선택" />

        <FormSelect name="option" placeHolder="옵션 선택" />

        <h2 className="text-[14px] mt-[6px]">예약 시간</h2>
        <div className="w-full h-[46px] flex felx-row gap-[10px]">
          <FormSelect name="bookingStart" placeHolder="00:00" />
          <div className="flex-shrink-0 flex items-center justify-center">
            ~
          </div>
          <FormSelect name="bookingEnd" placeHolder="00:00" />
        </div>
      </div>
    </div>
  );
};
