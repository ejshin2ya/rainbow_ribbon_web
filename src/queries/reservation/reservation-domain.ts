import { Domain } from 'src/api/endpoints';

class ReservationDomain {
  /**
   * @description get
   */
  bookingDetail(bookingId: string) {
    return Domain.getPath(
      `/api/booking/calendar/detail?bookingId=${bookingId}`,
    );
  }
  /**
   * @description get
   */
  get bookingList() {
    return Domain.getPath(`/api/booking/calendar`);
  }
  /**
   * @description get
   */
  get availableHours() {
    return Domain.getPath(`/api/no-auth/booking/check`);
  }
  /**
   * @description put
   */
  get changeBookingStatus() {
    return Domain.getPath(`/api/account/company/update/booking/status`);
  }
  /**
   * @description post
   */
  changeBookingMemo(bookingId: string) {
    return Domain.getPath(`/api/booking/calendar/memo?bookingId=${bookingId}`);
  }
  /**
   * @description post
   */
  get bookingTimeBlock() {
    return Domain.getPath(`/api/booking/calendar/restrict`);
  }
  get bookingTimeBlockList() {
    return Domain.getPath(`/api/booking/calendar/restrict/list`);
  }
}

export const reservationDomain = new ReservationDomain();
