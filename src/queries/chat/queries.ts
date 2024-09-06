import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllMessage,
  getChatList,
  getUnreadMessage,
  readMessage,
  sendMessage,
  startChat,
} from '../../services/chatService';
import { chatQueryKey } from './queryKey';

export const useChatList = function () {
  const { key } = chatQueryKey.chatList();
  return useQuery({
    queryFn: () => getChatList(),
    queryKey: key,
  });
};

export const useUnreadMessage = function (roomId: string) {
  const { key } = chatQueryKey.unreadMessage(roomId);
  return useQuery({
    queryKey: key,
    queryFn: () => getUnreadMessage(roomId),
  });
};

export const useAllMessage = function (roomId: string, pageNo: number) {
  const { key } = chatQueryKey.roomMessage(roomId, pageNo);
  return useQuery({
    queryKey: key,
    queryFn: () => getAllMessage(roomId, pageNo),
  });
};

export const useStartChat = function () {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.startChat();
  return useMutation({
    mutationFn: (partnerId: string) => startChat(partnerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Start Chat');
    },
  });
};

export const useSendMessage = function (roomId: number | string) {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.sendMessage(roomId);
  return useMutation({
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

export const useReadMessage = function (roomId: number | string) {
  const queryClient = useQueryClient();
  const { initialize } = chatQueryKey.readMessage(roomId);
  return useMutation({
    mutationFn: ({ roomId }: { roomId: string | number }) =>
      readMessage(roomId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: initialize }),
    onError: () => {
      console.error('Cannot Read Chat');
    },
  });
};
