import api from 'src/api/axios';
import {
  reservationDomain,
  GetReservationDetailOutputDTO,
  GetReservationOutputDTO,
  PutChangeBookingStatusOutputDTO,
  PostChangeBookingMemoOutputDTO,
  GetAvailableHoursOutputDTO,
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

export const getAvailableHours = async function (
  companyId: string,
  bookingDate: string,
) {
  return (
    await api<GetAvailableHoursOutputDTO>({
      method: 'get',
      url:
        reservationDomain.availableHours +
        `?companyId=${companyId}&bookingDate=${bookingDate}`,
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
      data: { bookingId, bookingStatus, sendAlert },
    })
  ).data;
};

export const changeBookingMemo = async function (
  bookingId: string,
  memo: string,
) {
  return (
    await api<PostChangeBookingMemoOutputDTO>({
      method: 'post',
      url: reservationDomain.changeBookingMemo(bookingId),
      data: { bookingId, memo },
    })
  ).data;
};
