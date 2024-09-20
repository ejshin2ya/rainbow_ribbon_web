import { SubtitleAndDesc } from './SubtitleAndDesc';
import { ReactComponent as BoardIcon } from '../../../assets/Board.svg';
import { useFuneralEventStore } from '../store/event-store';
import { useCalendarBookingDetail } from 'src/queries/reservation';
import {
  conversionDateDayATime,
  conversionFullDateTime,
} from 'src/utils/conversion';

export const ReservationInfo = function () {
  const { selectedEvent } = useFuneralEventStore();
  const { data } = useCalendarBookingDetail(selectedEvent);
  return (
    <div className="w-full">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <BoardIcon />
        예약 정보
      </h3>
      <div className="flex flex-col gap-[8px]">
        {/* "2023.11.07 17:40:13" */}
        <SubtitleAndDesc
          desc={conversionFullDateTime(
            data?.data.bookingInfo.paymentDate ?? '',
          )}
          subtitle="결제일시"
        />
        {/* "11.15(수) 오전 10:00" */}
        <SubtitleAndDesc
          desc={conversionDateDayATime(
            data?.data.bookingInfo.bookingDate ?? '',
          )}
          subtitle="예약날짜"
        />
        <SubtitleAndDesc
          desc={data?.data.bookingInfo.packageName}
          subtitle="패키지"
        />
        <SubtitleAndDesc desc="업체 수의함+추억쿠션" />
        <SubtitleAndDesc
          subtitle="총 결제 금액"
          desc={`${(data?.data.bookingInfo.totalFee ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
          descClassName={'text-reborn-orange3 font-bold'}
        />
      </div>
    </div>
  );
};
