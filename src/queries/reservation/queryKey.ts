export const reservationQueryKey = {
  bookingList(bookingMonth: string) {
    return {
      key: ['calendar', 'list', bookingMonth],
      initialize: ['calendar', 'list'],
    };
  },
  bookingDetail(bookingId: string) {
    return {
      key: ['calendar', 'detail', bookingId],
      initialize: ['calendar', 'detail', bookingId],
    };
  },
  changeBookingStatus() {
    return {
      key: ['calendar'],
      initialize: ['calendar'],
    };
  },
  changeBookingMemo(bookingId: string) {
    return {
      key: ['calendar', 'detail', bookingId],
      initialize: ['calendar', 'detail', bookingId],
    };
  },
};
