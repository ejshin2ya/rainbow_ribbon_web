import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Domain } from 'src/api/endpoints';
import { useQueryClient } from '@tanstack/react-query';
import api from 'src/api/axios';
import { useMutation } from '@tanstack/react-query';

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
  // TODO: 로그인 mutation 삭제해야 함
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async () => {
      return (
        await api<{
          statusCode: string;
          msg: string;
          data: {
            accessToken: string;
            refrechToken: string;
            userType: string;
            name: string;
            phone: string;
          };
        }>({
          method: 'post',
          data: { loginId: 'test1@naver.com', password: 'test1234' },
          url: '/api/account/company/auth/login',
        })
      ).data;
    },
    onSuccess: data1 => {},
  });
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    let stompClient: undefined | Client;
    let heartbeatInterval;
    mutateAsync().then(res => {
      const socketUrl = Domain.getPath('/chatting');
      const socket = new SockJS(socketUrl);
      // console.log('socketUrl', socketUrl);

      api.defaults.headers.common.Authorization =
        'Bearer ' + res.data.accessToken;

      stompClient = new Client({
        webSocketFactory: () => socket,
        // brokerURL: socketUrl,
        debug: str => {
          console.warn(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: {
          Authorization: `Bearer ${res.data.accessToken}`,
        },
      });
      console.log('stompClient', stompClient);

      stompClient.onConnect = () => {
        console.log('WebSocket Connected');

        stompClient?.subscribe(
          '/user/queue/notifications',
          (message: Message) => {
            if (message.body) {
              setMessages(prevMessages => [...prevMessages, message.body]);
              console.log('Received', message.body);
              // TODO: 메세지에 따라 세세하게 refetch
              queryClient.invalidateQueries({ queryKey: ['chat'] });
            }
          },
        );

        heartbeatInterval = setInterval(() => {
          if (stompClient?.connected) {
            stompClient.publish({
              destination: '/heartbeat',
              body: 'Heartbeat',
            });
          }
        }, 25000);

        setClient(stompClient as Client);
      };

      stompClient.onStompError = frame => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      stompClient.activate();
    });

    return () => {
      stompClient?.deactivate();
      clearInterval(heartbeatInterval);
    };
  }, []);

  // TODO: 로그인 뮤테이션 빼면 지워줘야함
  if (!isSuccess) return null;

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
