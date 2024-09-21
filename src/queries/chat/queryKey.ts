export const chatQueryKey = {
  chatList() {
    return {
      key: ['chat', 'list'],
      initialize: ['chat', 'list'],
    };
  },
  startChat() {
    return {
      key: ['chat', 'list'],
      initialize: ['chat', 'list'],
    };
  },
  chatBookingDetail(userId: string) {
    return {
      key: ['chat', 'booking-detail', userId],
      initialize: ['chat', 'booking-detail', userId],
    };
  },
  sendMessage(roomId: string) {
    return {
      key: ['chat', roomId],
      initialize: ['chat'],
    };
  },
  readMessage(roomId: string) {
    return {
      key: ['chat', roomId],
      initialize: ['chat'],
    };
  },
  unreadMessage(roomId: string) {
    return {
      key: ['chat', roomId],
      initialize: ['chat'],
    };
  },
  roomMessage(roomId, userId) {
    return {
      key: ['chat', roomId, userId],
      initialize: ['chat'],
    };
  },
};
