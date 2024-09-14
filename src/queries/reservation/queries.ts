import { useQuery } from '@tanstack/react-query';
import { reservationQueryKey } from '.';
import {
  getBookingDetail,
  getCalendarBookingList,
} from 'src/services/reservationService';

export const useCalendarBookingList = function (month: string) {
  const { key } = reservationQueryKey.bookingList(month);
  return useQuery({
    queryKey: key,
    queryFn: () => getCalendarBookingList(month),
  });
};

export const useCalendarBookingDetail = function (bookingId: string) {
  const { key } = reservationQueryKey.bookingDetail(bookingId);
  return useQuery({
    queryKey: key,
    queryFn: () => getBookingDetail(bookingId),
  });
};
