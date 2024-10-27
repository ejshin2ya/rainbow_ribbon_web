import { useController, useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextArea } from './FormTextArea';

export const PetSection = function () {
  const { control } = useFormContext();
  const { fieldState } = useController({ name: 'petType', control });

  return (
    <div className="w-full h-full flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        반려동물 정보
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">이름</h2>
        <FormInput
          name="petName"
          placeHolder="반려동물 이름을 입력해 주세요."
        />

        <h2 className="text-[14px] mt-[6px]">체중</h2>
        <FormInput
          name="petWeight"
          placeHolder="숫자나 .을 사용해 주세요."
          type="number"
        />

        <h2 className="text-[14px] mt-[6px]">구분(종)</h2>
        <FormInput
          name="petType"
          placeHolder="고양이(페르시안)"
          hasErrorMessage
        />
        <h2 className="text-[14px] mt-[6px]">나이</h2>
        <div className="w-full h-[46px] flex felx-row gap-[10px] items-center">
          <FormSelect
            name="petAgeYear"
            placeHolder="00"
            className="w-[86px]"
            optionList={new Array(30).fill(0).map((_, idx) => ({
              title: idx.toString().padStart(2, '0'),
              value: idx.toString().padStart(2, '0'),
            }))}
          />
          <div className="flex-shrink-0">년</div>
          <FormSelect
            name="petAgeMonth"
            placeHolder="00"
            className="w-[86px]"
            optionList={new Array(12).fill(0).map((_, idx) => ({
              title: idx.toString().padStart(2, '0'),
              value: idx.toString().padStart(2, '0'),
            }))}
          />
          <div className="flex-shrink-0">개월</div>
        </div>
        <h2 className="text-[14px] mt-[6px]">메모</h2>
        <FormTextArea
          name="memo"
          placeHolder="예약에 대한 메모를 입력해 주세요."
          rows={5}
        />
      </div>
    </div>
  );
};
