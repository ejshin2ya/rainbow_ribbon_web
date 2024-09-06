import { ChatContent } from './ChatContent';
import { ChatList } from './ChatList';

export const ChatContainer = function () {
  return (
    <div className="w-full h-full flex flex-row">
      <section className="w-1/3 flex-shrink-0 max-w-[400px]">
        <ChatList />
      </section>
      <section className="w-2/3 flex-1 bg-reborn-gray0">
        <ChatContent />
      </section>
    </div>
  );
};
