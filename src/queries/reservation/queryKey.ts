export const reservationQueryKey = {
  bookingList(bookingMonth: string) {
    return {
      key: ['calendar', 'list', bookingMonth],
      initialize: ['calendar', 'list'],
    };
  },
  bookingDetail(bookingId: string | number) {
    return {
      key: ['calendar', 'list', bookingId],
      initialize: ['calendar', 'list', bookingId],
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
