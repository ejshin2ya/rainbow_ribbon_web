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
  reservationBlock(bookingDate: string) {
    return {
      key: ['calendar', 'hours', bookingDate],
      initialize: ['calendar', 'hours'],
    };
  },
  reservationBlockList(bookingDate: string) {
    return {
      key: ['calendar', 'hours'],
      initialize: ['calendar', 'hours', bookingDate],
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
