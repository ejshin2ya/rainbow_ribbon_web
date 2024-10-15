import { FormInput } from './FormInput';

export const UserSection = function () {
  return (
    <div className="w-full h-[252px] flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        예약자 정보
        <span className="text-reborn-orange3">*</span>
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">이름</h2>
        <FormInput name="userName" placeHolder="이름을 입력해 주세요." />

        <h2 className="text-[14px]">휴대폰 번호</h2>
        <FormInput name="phoneNumber" placeHolder="'-' 없이 입력해 주세요." />

        <h2 className="text-[14px]">주소</h2>
        <div className="w-full h-[46px] flex flex-row gap-[5px]">
          <input
            className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none"
            placeholder="주소 찾기를 눌러주세요."
          />
          <div className="min-w-[84px] text-[14px] text-reborn-gray4 flex items-center justify-center border-[1px] border-reborn-gray2 flex-shrink-0 h-full rounded-[8px] px-[16px] py-[12.5px] cursor-pointer">
            주소 찾기
          </div>
        </div>
      </div>
    </div>
  );
};
