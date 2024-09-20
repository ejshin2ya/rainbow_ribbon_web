import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationQueryKey } from '.';
import {
  changeBookingStatus,
  getBookingDetail,
  getCalendarBookingList,
} from 'src/services/reservationService';

/**
 * query
 * @param month yyyy-mm
 */
export const useCalendarBookingList = function (month: string) {
  const { key } = reservationQueryKey.bookingList(month);
  return useQuery({
    queryKey: key,
    queryFn: () => getCalendarBookingList(month),
    enabled: !!month,
  });
};

/**
 * query
 * @param bookingId string
 */
export const useCalendarBookingDetail = function (bookingId: string) {
  const { key } = reservationQueryKey.bookingDetail(bookingId);
  return useQuery({
    queryKey: key,
    queryFn: () => getBookingDetail(bookingId),
    enabled: !!bookingId,
  });
};

/**
 * mutation
 * @param bookingId string
 * @param status yes | no
 */
export const useChangeBookingStatus = function () {
  const queryClient = useQueryClient();
  const { initialize } = reservationQueryKey.changeBookingStatus();
  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: 'yes' | 'no';
    }) => changeBookingStatus(bookingId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => console.log(`Cannot change status`),
  });
};
