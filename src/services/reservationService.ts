import api from 'src/api/axios';
import {
  reservationDomain,
  GetReservationDetailOutputDTO,
  GetReservationOutputDTO,
  PutChangeBookingStatusOutputDTO,
  PostChangeBookingMemoOutputDTO,
  GetAvailableHoursOutputDTO,
  OutputDTO,
  CreateReservation,
  GetFuneralOptionsOutputDTO,
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

export const reservationBlock = async function (restrictTime: string) {
  return (
    await api<OutputDTO>({
      method: 'post',
      data: { restrictTime },
      url: reservationDomain.bookingTimeBlock,
    })
  ).data;
};

export const reservationBlockList = async function (restrictTimes: string[]) {
  return (
    await api<OutputDTO>({
      method: 'post',
      data: { restrictTimes },
      url: reservationDomain.bookingTimeBlockList,
    })
  ).data;
};

export const createReservation = async function (data: CreateReservation) {
  return await api<OutputDTO>({
    method: 'post',
    data,
    url: reservationDomain.createReservation,
  });
};

export const getFuneralOptions = async function (partnerId: string) {
  return await api<GetFuneralOptionsOutputDTO>({
    method: 'get',
    url: reservationDomain.funeralOptions(partnerId),
  });
};
