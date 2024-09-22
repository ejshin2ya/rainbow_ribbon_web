import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationQueryKey } from '.';
import {
  changeBookingMemo,
  changeBookingStatus,
  getAvailableHours,
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
 * query
 * @param bookingId string
 */
export const useAvailableHours = function (
  companyId: string,
  bookingDate: string,
) {
  const { key } = reservationQueryKey.availableHours(bookingDate);
  return useQuery({
    queryKey: key,
    queryFn: () => getAvailableHours(companyId, bookingDate),
    enabled: !!bookingDate || !!companyId,
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
      sendAlert,
    }: {
      bookingId: string;
      status: 'yes' | 'no';
      sendAlert: boolean;
    }) => changeBookingStatus(bookingId, status, sendAlert),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => console.log(`Cannot change status`),
  });
};

/**
 * mutation
 * @param bookingId string
 * @param memo string
 */
export const useChangeBookingMemo = function (
  options?: Parameters<typeof useMutation>,
) {
  return useMutation({
    ...options,
    mutationFn: ({ bookingId, memo }: { bookingId: string; memo: string }) =>
      changeBookingMemo(bookingId, memo),
    onError: () => console.log(`Cannot change status`),
  });
};
