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
}

export const reservationDomain = new ReservationDomain();
