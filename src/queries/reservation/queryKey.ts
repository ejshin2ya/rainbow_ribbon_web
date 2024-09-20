export const reservationQueryKey = {
  bookingList(bookingMonth: string) {
    return {
      key: ['calendar', 'list', bookingMonth],
      initialize: ['calendar', 'list'],
    };
  },
  bookingDetail(bookingId: string | number) {
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
  // sendMessage(roomId: string | number) {
  //   return {
  //     key: ['chat', roomId],
  //     initialize: ['chat'],
  //   };
  // },
  // readMessage(roomId: string | number) {
  //   return {
  //     key: ['chat', roomId],
  //     initialize: ['chat'],
  //   };
  // },
  // unreadMessage(roomId: string | number) {
  //   return {
  //     key: ['chat', roomId],
  //     initialize: ['chat'],
  //   };
  // },
  // roomMessage(roomId, pageNo) {
  //   return {
  //     key: ['chat', roomId, pageNo],
  //     initialize: ['chat'],
  //   };
  // },
};
