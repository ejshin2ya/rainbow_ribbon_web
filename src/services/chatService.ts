import { chatDomain } from '../queries/chat/chat-domain';
import api from 'src/api/axios';
import {
  StartChatRes,
  GetRoomListRes,
  SendMessageRes,
  GetAllMessage,
  GetUnreadMessageRes,
} from '../queries/chat/types';
import { GetReservationDetailOutputDTO } from 'src/queries/reservation';

export const getChatList = async function () {
  return (
    await api<GetRoomListRes>({
      method: 'get',
      url: chatDomain.chatList,
    })
  ).data;
};

export const startChat = async function (partnerId: string) {
  return (
    await api<StartChatRes>({
      method: 'post',
      url: chatDomain.chatStart,
      data: { partnerId },
    })
  ).data;
};

export const sendMessage = async function (
  roomId: string | number,
  message: string,
) {
  return (
    await api<SendMessageRes>({
      method: 'post',
      url: chatDomain.sendMessage(roomId),
      data: { message },
    })
  ).data;
};

export const readMessage = async function (roomId: string) {
  return (
    await api({
      method: 'put',
      url: chatDomain.read(roomId),
    })
  ).data;
};

export const getUnreadMessage = async function (roomId: number | string) {
  return (
    await api<GetUnreadMessageRes>({
      method: 'get',
      url: chatDomain.getUnreadMessage(roomId),
    })
  ).data;
};

export const getAllMessage = async function (roomId: string, pageNo: number) {
  return (
    await api<GetAllMessage>({
      method: 'get',
      url: chatDomain.getAllMessage(roomId, pageNo),
    })
  ).data;
};

export const getBookingDetailByUserId = async function (userId: string) {
  return (
    await api<GetReservationDetailOutputDTO>({
      method: 'get',
      url: chatDomain.bookingDetail(userId),
    })
  ).data;
};
