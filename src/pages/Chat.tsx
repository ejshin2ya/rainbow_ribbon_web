import { ChatContainer } from 'src/components/chat/ChatContainer';
import { ChatProvider } from 'src/components/chat/store/chat-store';

export const Chat = function () {
  return (
    <ChatProvider>
      <div className="w-full h-full flex-1">
        <ChatContainer />
      </div>
    </ChatProvider>
  );
};
