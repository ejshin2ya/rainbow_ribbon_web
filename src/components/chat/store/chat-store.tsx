import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useChatList } from 'src/queries';

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
      setSelectedRoomId(prev => prev || data?.data[0].roomId);
      setSelectedUserId(prev => prev || data?.data[0].userId);
    }
  }, [isLoading]);

  useEffect(() => {
    const handler = function (e: MessageEvent) {
      if (e.data?._typeFlag === 'clickChat') {
        changeRoom(e.data?.roomId);
        changeUser(e.data?.userId);
      }
    };
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

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
