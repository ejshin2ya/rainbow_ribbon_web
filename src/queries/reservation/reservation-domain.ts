import { Domain } from 'src/api/endpoints';

class ReservationDomain {
  /**
   * @description get
   */
  bookingDetail(bookingId: string | number) {
    return Domain.getPath(`/api/booking/calendar/detail/${bookingId}`);
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
}

export const reservationDomain = new ReservationDomain();
