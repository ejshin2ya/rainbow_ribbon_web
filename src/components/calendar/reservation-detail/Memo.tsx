import {
  GetReservationDetailOutputDTO,
  reservationQueryKey,
  useCalendarBookingDetail,
  useChangeBookingMemo,
} from 'src/queries/reservation';
import { ReactComponent as MemoIcon } from '../../../assets/Memo.svg';
import { useFuneralEventStore } from '../store/event-store';
import { useQueryClient } from '@tanstack/react-query';
import { ReservationDefaultParams } from './ReservationDetail';

export const Memo = function ({
  reservationInfo,
  selectedEventId,
}: ReservationDefaultParams) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useChangeBookingMemo();
  return (
    <div className="w-full flex-1">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <MemoIcon />
        메모
      </h3>
      <textarea
        className="w-full px-[12px] py-[10px] rounded-[4px] border-[1px] bg-reborn-gray0 border-reborn-gray1 resize-none focus:outline-none text-[12px] leading-[18px] font-medium"
        placeholder="예약에 대한 메모를 남겨보세요."
        rows={3}
        defaultValue={reservationInfo.bookingInfo.memo ?? ''}
        onBlur={e => {
          mutateAsync({
            bookingId: selectedEventId,
            memo: e.target.value,
          }).then(() => {
            const { key } = reservationQueryKey.bookingDetail(selectedEventId);
            const { data, msg, statusCode } = queryClient.getQueryData(
              key,
            ) as GetReservationDetailOutputDTO;
            queryClient.setQueryData(key, {
              msg,
              statusCode,
              data: {
                ...data,
                bookingInfo: { ...data.bookingInfo, memo: e.target.value },
              },
            });
          });
        }}
      />
    </div>
  );
};
