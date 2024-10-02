import { SubtitleAndDesc } from './SubtitleAndDesc';
import { ReactComponent as FootPrintIcon } from '../../../assets/FootPrint.svg';
import { conversionYearMonth } from 'src/utils/conversion';
import { ReservationDefaultParams } from './ReservationDetail';

export const PetInfo = function ({
  reservationInfo,
}: ReservationDefaultParams) {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <FootPrintIcon />
        반려동물 정보
      </h3>
      <div className="flex flex-col gap-[8px]">
        <SubtitleAndDesc subtitle="이름" desc={reservationInfo.petInfo.name} />
        <SubtitleAndDesc
          subtitle="체중"
          desc={reservationInfo.petInfo.weight + 'kg'}
        />
        <SubtitleAndDesc
          subtitle="구분"
          desc={`${reservationInfo.petInfo.majorType} (${reservationInfo.petInfo.minorType})`}
        />
        <SubtitleAndDesc
          subtitle="나이"
          desc={conversionYearMonth(reservationInfo.petInfo.age ?? '')}
        />
      </div>
    </div>
  );
};
