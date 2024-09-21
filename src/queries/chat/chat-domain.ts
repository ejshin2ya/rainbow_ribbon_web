import { Domain } from 'src/api/endpoints';

class ChatDomain {
  /**
   * @description get
   */
  get chatList() {
    return Domain.getPath('/api/chatting/room/list');
  }
  /**
   * @description post
   */
  get chatStart() {
    return Domain.getPath('/api/chatting/room');
  }
  /**
   * @description post
   */
  sendMessage(roomId: number | string) {
    return Domain.getPath(`/api/chatting/${roomId}/message`);
  }
  /**
   * @description put
   */
  read(roomId) {
    return Domain.getPath(`/api/chatting/${roomId}/message/read`);
  }
  /**
   * @description get
   */
  getUnreadMessage(roomId: number | string) {
    return Domain.getPath(`/chatting/${roomId}/message/new`);
  }
  /**
   * @description get
   */
  getAllMessage(roomId: string, pageNo: number) {
    return Domain.getPath(
      `/api/chatting/${roomId}/message/list/v2?pageNo=${pageNo}`,
    );
  }
  /**
   * @description get
   */
  bookingDetail(userId: string) {
    return Domain.getPath(`/api/booking/calendar/detail?userId=${userId}`);
  }
}

export const chatDomain = new ChatDomain();
