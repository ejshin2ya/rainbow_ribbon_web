import { Domain } from 'src/api/endpoints';

class ChatDomain {
  get chatList() {
    return Domain.getPath('/api/chatting/room/list');
  }
  get chatStart() {
    return Domain.getPath('/api/chatting/room');
  }
  sendMessage(roomId: number | string) {
    return Domain.getPath(`/api/chatting/${roomId}/message`);
  }
  read(roomId) {
    return Domain.getPath(`/api/chatting/${roomId}/message/read`);
  }
  getUnreadMessage(roomId: number | string) {
    return Domain.getPath(`/chatting/${roomId}/message/new`);
  }
  getAllMessage(roomId: number | string) {
    return Domain.getPath(`/api/chatting/${roomId}/message/list`);
  }
}

export const chatDomain = new ChatDomain();
