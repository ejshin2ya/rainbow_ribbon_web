import { useChatList } from 'src/queries';
import { ChatListItem } from './ChatListItem';

export const ChatList = function () {
  const { data: roomListData, isLoading } = useChatList();

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full flex-shrink-0 flex flex-col py-[28px] px-[23.5px] border-b-[1px] border-b-reborn-gray1">
        <div className="text-[14px] font-medium text-[#adadad] mb-[12px]">
          채팅 상담
        </div>
        <div className="mb-[15px] w-full flex flex-row justify-between items-center">
          <div className="w-full flex-1 text-reborn-gray8 text-[18px] font-semibold flex flex-row">
            모든 메세지
            <div>{`>`}</div>
          </div>
          <div className="flex-shrink-0 text-[12px] text-reborn-gray4 font-medium">
            읽지 않은 메세지{' '}
            <span className="text-reborn-orange4">
              {roomListData?.data.reduce((acc, cur) => {
                return acc + cur.unreadCount;
              }, 0)}
              건
            </span>
          </div>
        </div>
        <input
          className="w-full h-[40px] flex flex-row items-center bg-reborn-gray0 rounded-[4px] py-[8px] px-[12px]"
          placeholder="검색어를 입력해 주세요"
        />
      </header>
      <div className="w-full flex-1 flex flex-col overflow-y-auto">
        {roomListData?.data.map(roomInfo => {
          return (
            <ChatListItem
              roomInfo={roomInfo}
              key={`${roomInfo.roomId}-${roomInfo.userId}`}
            />
          );
        })}
      </div>
    </div>
  );
};
