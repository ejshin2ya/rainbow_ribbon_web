import api from 'src/api/axios';
import {
  reservationDomain,
  GetReservationDetailOutputDTO,
  GetReservationOutputDTO,
  PutChangeBookingStatusOutputDTO,
  PostChangeBookingMemoOutputDTO,
} from 'src/queries/reservation';

export const getCalendarBookingList = async function (month: string) {
  return (
    await api<GetReservationOutputDTO>({
      method: 'get',
      url: `${reservationDomain.bookingList}?month=${encodeURIComponent(month)}`,
    })
  ).data;
};

export const getBookingDetail = async function (bookingId: string) {
  return (
    await api<GetReservationDetailOutputDTO>({
      method: 'get',
      url: reservationDomain.bookingDetail(bookingId),
    })
  ).data;
};

export const changeBookingStatus = async function (
  bookingId: string,
  bookingStatus: 'yes' | 'no',
  sendAlert: boolean,
) {
  return (
    await api<PutChangeBookingStatusOutputDTO>({
      method: 'put',
      url: reservationDomain.changeBookingStatus,
      data: { bookingId, status: bookingStatus, sendAlert },
    })
  ).data;
};

export const changeBookingMemo = async function (
  bookingId: string,
  memo: string,
) {
  return (
    await api<PostChangeBookingMemoOutputDTO>({
      method: 'put',
      url: reservationDomain.changeBookingStatus,
      data: { bookingId, memo },
    })
  ).data;
};
