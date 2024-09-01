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
  changeRoom: (roomId: string | number) => void;
}

const ChatStore = createContext<Partial<ChatStoreType>>({});

export const ChatProvider = function ({ children }: PropsWithChildren) {
  const { data, isLoading } = useChatList();
  const { data: roomList } = data as GetRoomListRes;
  const [selectedRoomId, setSelectedRoomId] = useState<
    string | number | undefined
  >();
  const changeRoom = function (roomId: string | number) {
    setSelectedRoomId(roomId);
  };
  useEffect(() => {
    if (roomList.length) {
      setSelectedRoomId(roomList[0].roomId);
    }
  }, []);
  if (isLoading) return null;
  return (
    <ChatStore.Provider value={{ selectedRoomId, changeRoom }}>
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
