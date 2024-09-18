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
  sendMessage(roomId: string | number) {
    return {
      key: ['chat', roomId],
      initialize: ['chat'],
    };
  },
  readMessage(roomId: string | number) {
    return {
      key: ['chat', roomId],
      initialize: ['chat'],
    };
  },
  unreadMessage(roomId: string | number) {
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
