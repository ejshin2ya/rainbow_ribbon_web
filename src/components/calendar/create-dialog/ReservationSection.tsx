import { useFormContext } from 'react-hook-form';
import { FormSelect } from './FormSelect';
import { useQuery } from '@tanstack/react-query';
import { getCompanyInfo } from 'src/services/companyService';
import { useFuneralOptions } from 'src/queries/reservation';

export const ReservationSection = function () {
  const { watch } = useFormContext();
  const start = watch('bookingStart') || `0`;
  const end = watch('bookingEnd') || `0.1`;
  // TODO: 쿼리문 연동 및 삭제
  const { data } = useQuery({
    queryKey: ['company'],
    queryFn: () => {
      return getCompanyInfo().then(res => {
        return res;
      });
    },
  });
  const { data: funeralOptions } = useFuneralOptions(data?.data.id ?? '');

  const timeArray = new Array(25).fill(0).map((_, idx) => {
    return {
      title: `${idx.toString().padStart(2, '0')}:00`,
      value: `${idx}`,
    };
  });
  return (
    <div className="w-full h-[247px] flex flex-col gap-[16px]">
      <h1 className="font-semibold text-[16px] text-reborn-gray8 flex-shrink-0">
        예약 정보
        <span className="text-reborn-orange3">*</span>
      </h1>
      <div className="w-full flex-1 h-1 flex flex-col gap-[6px]">
        <h2 className="text-[14px]">패키지</h2>

        <FormSelect
          name="package"
          placeHolder="패키지 선택"
          optionList={[
            { title: '단순 패키지', value: '단순' },
            { title: '기본 패키지', value: '기본' },
            { title: '보통 패키지', value: '보통' },
          ]}
        />

        <FormSelect
          name="option"
          placeHolder="옵션 선택"
          optionList={funeralOptions?.data.data.map(fun => ({
            title: fun.funeralType,
            value: fun.funeralId,
          }))}
        />

        <h2 className="text-[14px] mt-[6px]">예약 시간</h2>
        <div className="w-full h-[46px] flex felx-row gap-[10px]">
          <FormSelect
            name="bookingStart"
            placeHolder="00:00"
            optionList={timeArray}
          />
          <div className="flex-shrink-0 flex items-center justify-center">
            ~
          </div>
          <FormSelect
            name="bookingEnd"
            placeHolder="00:00"
            optionList={timeArray}
          />
        </div>
        {start >= end && (
          <div className="w-full text-[12px] text-reborn-orange3 translate-y-[-4px] px-[4px]">
            예약 종료 시간은 예약 시작 시간보다 이를 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
