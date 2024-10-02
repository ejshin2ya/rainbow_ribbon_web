import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { Domain } from 'src/api/endpoints';
import { useQueryClient } from '@tanstack/react-query';
import api from 'src/api/axios';
import { useMutation } from '@tanstack/react-query';

interface StompContextProps {
  client: Client;
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
          data: { loginId: 'woooriii@naver.com', password: 'woooriii' },
          url: '/api/no-auth/account/company/login',
        })
      ).data;
    },
  });
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    let stompClient: Client;
    let heartbeatInterval;
    mutateAsync().then(res => {
      const socketUrl = Domain.getPath('/chatting');
      const socket = new WebSocket(socketUrl);

      api.defaults.headers.common.Authorization =
        'Bearer ' + res.data.accessToken;

      stompClient = new Client({
        webSocketFactory: () => socket,
        // brokerURL: socketUrl,
        debug: str => {
          if (process.env.NODE_ENV === 'development')
            console.log(`%cDebug\n${str}`, 'color: red;');
        },
        reconnectDelay: 10 * 1000,
        heartbeatIncoming: 25 * 1000,
        heartbeatOutgoing: 25 * 1000,
        connectHeaders: {
          Authorization: `Bearer ${res.data.accessToken}`,
        },
      });

      stompClient.onConnect = frame => {
        stompClient?.subscribe(
          '/user/queue/notifications',
          (message: Message) => {
            console.log('유저 큐 노티 메세지', message);
            if (message.body) {
              setMessages(prevMessages => [...prevMessages, message.body]);
              console.log('Received', message.body);
              // TODO: 메세지에 따라 세세하게 refetch
              queryClient.invalidateQueries({ queryKey: ['chat'] });
            }
          },
          {
            id: frame.headers?.['user-name'],
            'user-name': frame.headers?.['user-name'],
            version: frame.headers?.['version'],
            'heart-beat': frame.headers?.['heart-beat'],
            Authorization: `Bearer ${res.data.accessToken}`,
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
      };

      stompClient.onWebSocketClose = e => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('WebSocket closed with code:', e.code);
          console.warn('WebSocket close reason:', e.reason);
        }

        switch (e.code) {
          case 1000:
            if (process.env.NODE_ENV === 'development')
              console.log('WebSocket 정상적으로 종료되었습니다.');
            break;
          case 1006:
            if (process.env.NODE_ENV === 'development')
              console.error('WebSocket 비정상 종료. 재연결을 시도합니다.');
            if (stompClient?.reconnectDelay) {
              stompClient.activate(); // 재연결 시도
            }
            break;
          default:
            if (process.env.NODE_ENV === 'development')
              console.error('WebSocket closed with an unhandled code:', e.code);
        }
      };

      stompClient.onStompError = frame => {
        if (process.env.NODE_ENV === 'development') {
          console.error('STOMP error: ' + frame.headers['message']);
          console.error('Error details: ' + frame.body);
        }
      };

      stompClient.onWebSocketError = error => {
        if (process.env.NODE_ENV === 'development') {
          console.error('WebSocket error:', error);
          console.log('readyState', stompClient?.webSocket?.readyState);
        }
      };

      stompClient.activate();
      setClient(stompClient);
    });

    return () => {
      if (stompClient?.connected) {
        stompClient.deactivate();
      }
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, []);

  // TODO: 로그인 뮤테이션 빼면 지워줘야함
  if (!isSuccess) return null;
  if (!client) return null;

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
