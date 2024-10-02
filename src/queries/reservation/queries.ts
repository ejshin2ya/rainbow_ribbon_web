import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationQueryKey } from '.';
import {
  changeBookingMemo,
  changeBookingStatus,
  getAvailableHours,
  getBookingDetail,
  getCalendarBookingList,
  reservationBlock,
  reservationBlockList,
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
    enabled: !!bookingDate && !!companyId,
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
      status: bookingStatus,
      sendAlert,
    }: {
      bookingId: string;
      status: 'yes' | 'no';
      sendAlert: boolean;
    }) => changeBookingStatus(bookingId, bookingStatus, sendAlert),
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

/**
 * mutation
 * @param restrictTime string ISODateString
 */
export const useReservationBlock = function (
  bookingDate: string,
  options?: Parameters<typeof useMutation>,
) {
  const queryClient = useQueryClient();
  const { initialize } = reservationQueryKey.reservationBlock(bookingDate);
  return useMutation({
    ...options,
    mutationFn: ({ restrictTime }: { restrictTime: string }) =>
      reservationBlock(restrictTime),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => console.log(`Cannot change status`),
  });
};

/**
 * mutation
 * @param restrictTimes string[] ISODateString[]
 */
export const useReservationBlockList = function (
  bookingDate: string,
  options?: Parameters<typeof useMutation>,
) {
  const queryClient = useQueryClient();
  const { initialize } = reservationQueryKey.reservationBlock(bookingDate);
  return useMutation({
    ...options,
    mutationFn: ({ restrictTimes }: { restrictTimes: string[] }) =>
      reservationBlockList(restrictTimes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => console.log(`Cannot change status`),
  });
};
