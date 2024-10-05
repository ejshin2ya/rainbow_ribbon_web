import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useChatList } from 'src/queries';
import { GetRoomListRes } from 'src/queries/chat/types';

interface ChatStoreType {
  selectedRoomId: string;
  selectedUserId: string;
  changeRoom: (roomId: string) => void;
  changeUser: (userId: string) => void;
}

const ChatStore = createContext<Partial<ChatStoreType>>({});

export const ChatProvider = function ({ children }: PropsWithChildren) {
  const { data, isLoading } = useChatList();
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const changeRoom = function (roomId: string) {
    setSelectedRoomId(roomId);
  };
  const changeUser = function (userId: string) {
    setSelectedUserId(userId);
  };
  useEffect(() => {
    if (data?.data.length) {
      setSelectedRoomId(data?.data[0].roomId);
      setSelectedUserId(data?.data[0].userId);
    }
  }, [isLoading]);

  return (
    <ChatStore.Provider
      value={{ selectedRoomId, changeRoom, selectedUserId, changeUser }}
    >
      {children}
    </ChatStore.Provider>
  );
};

export const useChatStore = function () {
  const store = useContext(ChatStore);
  if (!store) {
    throw new Error(
      `useFuneralEventStore must use with <FuneralEventProvider>.`,
    );
  }
  return store as ChatStoreType;
};
