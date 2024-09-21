import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllMessage,
  getBookingDetailByUserId,
  getChatList,
  getUnreadMessage,
  readMessage,
  sendMessage,
  startChat,
} from '../../services/chatService';
import { chatQueryKey } from './queryKey';

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
  pageNo: number,
  options?: Parameters<typeof useQuery>,
) {
  const { key } = chatQueryKey.roomMessage(roomId, pageNo);
  return useQuery({
    ...options,
    queryKey: key,
    queryFn: () => getAllMessage(roomId, pageNo),
    enabled: !!roomId,
  });
};

export const useChatBookingDetail = function (userId: string) {
  const { key } = chatQueryKey.chatBookingDetail(userId);
  return useQuery({
    queryKey: key,
    queryFn: () => getBookingDetailByUserId(userId),
    enabled: !!userId,
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
  roomId: string,
  options?: Parameters<typeof useMutation>,
) {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.sendMessage(roomId);
  return useMutation({
    ...options,
    mutationFn: ({
      roomId,
      message,
    }: {
      roomId: string | number;
      message: string;
    }) => sendMessage(roomId, message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
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
