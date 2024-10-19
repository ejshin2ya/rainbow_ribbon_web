import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllMessage,
  getBookingDetailByUserId,
  getChatList,
  getSearch,
  getUnreadMessage,
  readMessage,
  sendImage,
  sendMessage,
  startChat,
} from '../../services/chatService';
import { chatQueryKey } from './queryKey';
import { getBookingDetail } from 'src/services/reservationService';

export const useChatList = function (options?: Parameters<typeof useQuery>) {
  const { key } = chatQueryKey.chatList();
  return useQuery({
    ...options,
    queryFn: () => getChatList(),
    queryKey: key,
  });
};

export const useUnreadMessage = function (
  roomId: string,
  options?: Parameters<typeof useQuery>,
) {
  const { key } = chatQueryKey.unreadMessage(roomId);
  return useQuery({
    ...options,
    queryKey: key,
    queryFn: () => getUnreadMessage(roomId),
    enabled: !!roomId,
  });
};

export const useAllMessage = function (
  roomId: string,
  lastId: string,
  options?: Parameters<typeof useQuery>,
) {
  const { key } = chatQueryKey.roomMessage(roomId, lastId);
  return useQuery({
    ...options,
    queryKey: key,
    queryFn: () => getAllMessage(roomId, lastId),
    enabled: !!roomId,
  });
};

export const useChatBookingDetail = function (
  userId: string,
  type: 'user' | 'reservation' = 'user',
) {
  const { key } = chatQueryKey.chatBookingDetail(userId);
  return useQuery({
    queryKey: key,
    queryFn: () => {
      if (type === 'user') {
        return getBookingDetailByUserId(userId);
      } else {
        return getBookingDetail(userId);
      }
    },
    enabled: !!userId,
  });
};

export const useChatSearch = function (keyword: string) {
  const { key } = chatQueryKey.search(keyword);
  return useQuery({
    queryKey: key,
    queryFn: () => getSearch(keyword),
    enabled: !!keyword,
  });
};

export const useStartChat = function (
  options?: Parameters<typeof useMutation>,
) {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.startChat();
  return useMutation({
    ...options,
    mutationFn: (partnerId: string) => startChat(partnerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Start Chat');
    },
  });
};

export const useSendMessage = function (
  // roomId: string,
  options?: Parameters<typeof useMutation>,
) {
  return useMutation({
    ...options,
    mutationFn: ({ roomId, message }: { roomId: string; message: string }) =>
      sendMessage(roomId, message),
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Send Chat');
    },
  });
};

export const useSendImage = function (
  // roomId: string,
  options?: Parameters<typeof useMutation>,
) {
  return useMutation({
    ...options,
    mutationFn: ({
      roomId,
      message = '',
      files,
    }: {
      roomId: string;
      message?: string;
      files: File[];
    }) => sendImage(roomId, message, files),
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Send Chat');
    },
  });
};

export const useReadMessage = function (
  roomId: string,
  options?: Parameters<typeof useMutation>,
) {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.readMessage(roomId);
  return useMutation({
    ...options,
    mutationFn: ({ roomId }: { roomId: string }) => readMessage(roomId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Read Chat');
    },
  });
};
