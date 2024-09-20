import { SubtitleAndDesc } from './SubtitleAndDesc';
import { ReactComponent as FootPrintIcon } from '../../../assets/FootPrint.svg';
import { useFuneralEventStore } from '../store/event-store';
import { useCalendarBookingDetail } from 'src/queries/reservation';
import { conversionYearMonth } from 'src/utils/conversion';

export const PetInfo = function () {
  const { selectedEvent } = useFuneralEventStore();
  const { data } = useCalendarBookingDetail(selectedEvent);

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <FootPrintIcon />
        반려동물 정보
      </h3>
      <div className="flex flex-col gap-[8px]">
        <SubtitleAndDesc subtitle="이름" desc={data?.data.petInfo.name} />
        <SubtitleAndDesc
          subtitle="체중"
          desc={data?.data.petInfo.weight + 'kg'}
        />
        <SubtitleAndDesc
          subtitle="구분"
          desc={`${data?.data.petInfo.majorType} (${data?.data.petInfo.minorType})`}
        />
        <SubtitleAndDesc
          subtitle="나이"
          desc={conversionYearMonth(data?.data.petInfo.age ?? '')}
        />
      </div>
    </div>
  );
};
