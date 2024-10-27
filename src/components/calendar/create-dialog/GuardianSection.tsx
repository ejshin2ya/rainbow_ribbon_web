import { FormInput } from './FormInput';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
  openAddressModal: () => void;
}

export const GuardianSection = function ({ openAddressModal }: Props) {
  const { control } = useFormContext();
  const { field: addressField } = useController({ name: 'address', control });
  const { field: postalCodeField } = useController({
    name: 'postalCode',
    control,
  });
  return (
    <div className="w-full h-[252px] flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        예약자 정보
        <span className="text-reborn-orange3">*</span>
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">이름</h2>
        <FormInput name="userName" placeHolder="이름을 입력해 주세요." />

        <h2 className="text-[14px] mt-[6px]">휴대폰 번호</h2>
        <FormInput
          name="phoneNumber"
          placeHolder="'-' 없이 입력해 주세요."
          type="number"
        />

        <h2 className="text-[14px] mt-[6px]">주소</h2>
        <div className="w-full h-[46px] flex flex-row gap-[5px]">
          <input
            className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none text-[14px]"
            placeholder="주소 찾기를 눌러주세요."
            disabled
            {...addressField}
          />
          <input className="hidden" {...postalCodeField} />
          <div
            className="min-w-[84px] text-[14px] text-reborn-gray4 flex items-center justify-center border-[1px] border-reborn-gray2 flex-shrink-0 h-full rounded-[8px] px-[16px] py-[12.5px] cursor-pointer hover:bg-reborn-gray0 active:bg-reborn-gray1 duration-200"
            onClick={openAddressModal}
          >
            주소 찾기
          </div>
        </div>
      </div>
    </div>
  );
};
