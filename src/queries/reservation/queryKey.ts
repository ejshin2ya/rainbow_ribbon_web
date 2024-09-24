export const reservationQueryKey = {
  bookingList(bookingMonth: string) {
    return {
      key: ['calendar', 'list', bookingMonth],
      initialize: ['calendar', 'list'],
    };
  },
  availableHours(bookingDate: string) {
    return {
      key: ['calendar', 'hours', bookingDate],
      initialize: ['calendar', 'hours', bookingDate],
    };
  },
  reservationBlock(restrictTime: string) {
    return {
      key: ['calendar', 'hours', restrictTime],
      initialize: ['calendar', 'hours', restrictTime],
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
