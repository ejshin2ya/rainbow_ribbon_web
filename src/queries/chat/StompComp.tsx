import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Domain } from 'src/api/endpoints';
import { useQueryClient } from '@tanstack/react-query';

interface StompContextProps {
  client: Client | null;
  messages: string[];
}

const StompContext = createContext<StompContextProps | null>(null);

export const StompProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  // TODO: messages는 추후 삭제해야 함
  const [messages, setMessages] = useState<string[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const socketUrl = Domain.getPath('/chatting');
    const socket = new SockJS(socketUrl);

    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: str => {
        console.warn(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    let heartbeatInterval;
    stompClient.onConnect = () => {
      console.log('WebSocket Connected');

      stompClient.subscribe('/user/queue/notifications', (message: Message) => {
        if (message.body) {
          setMessages(prevMessages => [...prevMessages, message.body]);
          console.log('메세지 수신', message.body);
          // TODO: 메세지에 따라 세세하게 refetch
          queryClient.invalidateQueries({ queryKey: ['chat'] });
        }
      });

      heartbeatInterval = setInterval(() => {
        if (stompClient.connected) {
          stompClient.publish({
            destination: '/heartbeat',
            body: 'Heartbeat',
          });
        }
      }, 25000);

      setClient(stompClient);
    };

    stompClient.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      clearInterval(heartbeatInterval);
    };
  }, []);

  return (
    <StompContext.Provider value={{ client, messages }}>
      {children}
    </StompContext.Provider>
  );
};

export const useStomp = () => {
  const context = useContext(StompContext);
  if (!context) {
    throw new Error('useStomp must use with <StompProvider>.');
  }
  return context as StompContextProps;
};
