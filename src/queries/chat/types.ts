export interface RoomListDto {
  // api/chatting/room/list
  // 현재 제공중인 값
  roomId: string;
  userId: string;
  companyId: string;
  imgUrl: string;
  name: string;
  booked: boolean;
  unreadCount: number;
  address: string;
  lastMessage: string;
  lastMessageDateTime: string;
}

export interface GetRoomListRes {
  data: RoomListDto[];
  msg: string;
  statusCode: string;
}

export interface StartChatRes {
  roomId: string;
  userId: string;
  companyId: string;
  imgUrl: string;
  companyName: string;
  companyAddress: string;
  isReserved: boolean;
  unreadCount: number;
}

export interface SendMessageRes {
  roomId: string;
  senderType: string;
  message: string;
  createdAt: string;
}

export interface GetUnreadMessageRes {
  messageList: {
    roomId: string;
    senderType: string;
    message: string;
    createdAt: string;
  }[];
}

export interface GetAllMessage {
  data: {
    createAt: string;
    message: string;
    messageId: string;
    receiverId: string;
    roomId: string;
    senderType: string;
  }[];
  msg: string;
  statusCode: string;
}
