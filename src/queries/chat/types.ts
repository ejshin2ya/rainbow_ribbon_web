export interface GetRoomListRes {
  chatRoomList: {
    roomId: string;
    userId: string;
    companyId: string;
    imgUrl: string;
    companyName: string;
    companyAddress: string;
    isReserved: boolean;
    unreadCount: number;
    lastMessage: string;
  }[];
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
  messageList: {
    roomId: string;
    senderType: string;
    message: string;
    createdAt: string;
  }[];
}
