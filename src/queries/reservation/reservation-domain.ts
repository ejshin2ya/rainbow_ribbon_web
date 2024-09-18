import { Domain } from 'src/api/endpoints';

class ReservationDomain {
  /**
   * @description get
   */
  bookingDetail(bookingId: string | number) {
    return Domain.getPath(`/api/booking/calendar/${bookingId}`);
  }
  /**
   * @description get
   */
  get bookingList() {
    return Domain.getPath(`/api/booking/calendar`);
  }
  // /**
  //  * @description get, post
  //  */
  // get funerals() {
  //   return Domain.getPath(`/api/account/company/funeral`);
  // }
  // /**
  //  * @description get, post
  //  */
  // get companyInfo() {
  //   return Domain.getPath(`/api/account/company/info`);
  // }

  // /**
  //  * @description put
  //  * */
  // get changeReservationStatus() {
  //   return Domain.getPath(`/api/account/company/update/booking/status`);
  // }
  // /**
  //  * @description get
  //  */
  // userReservationList(userId: string | number) {
  //   return Domain.getPath(`/api/account/company/user/${userId}/booking/list`);
  // }
}

export const reservationDomain = new ReservationDomain();
