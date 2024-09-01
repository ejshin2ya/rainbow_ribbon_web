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
  selectedRoomId?: string | number;
  selectedUserId?: string | number;
  changeRoom: (roomId: string | number) => void;
  changeUser: (userId: string | number) => void;
}

const ChatStore = createContext<Partial<ChatStoreType>>({});

export const ChatProvider = function ({ children }: PropsWithChildren) {
  const { data, isLoading } = useChatList();
  const [selectedRoomId, setSelectedRoomId] = useState<
    string | number | undefined
  >();
  const [selectedUserId, setSelectedUserId] = useState<
    string | number | undefined
  >();
  const changeRoom = function (roomId: string | number) {
    setSelectedRoomId(roomId);
  };
  const changeUser = function (userId: string | number) {
    setSelectedUserId(userId);
  };
  useEffect(() => {
    if (data?.data.length) {
      setSelectedRoomId(data?.data[0].roomId);
      setSelectedUserId(data?.data[0].userId);
    }
  }, [isLoading]);
  // if (isLoading) return null;
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
