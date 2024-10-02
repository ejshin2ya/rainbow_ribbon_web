import { RoomListDto } from 'src/queries/chat/types';
import { useChatStore } from './store/chat-store';
import { Fragment } from 'react';

interface Props {
  roomInfo: RoomListDto;
  keyword?: string;
}

export const ChatListItem = function ({ roomInfo, keyword = '' }: Props) {
  const { selectedRoomId, changeRoom, changeUser } = useChatStore();

  const date = new Date(roomInfo.lastMessageDateTime);
  const keywordChager = function (message: string) {
    if (!keyword) return message;
    const messages = message.split(keyword);
    return (
      <>
        {messages.map((msg, idx) => (
          <Fragment key={`text-splitter-${idx}`}>
            {msg}
            {idx < messages.length - 1 && (
              <span className="!text-reborn-orange3">{keyword}</span>
            )}
          </Fragment>
        ))}
      </>
    );
  };
  const hour = date.getHours();

  return (
    <div
      className={`w-full h-[135px] px-[25px] py-[28px] flex flex-col border-b-[1px] border-reborn-gray1 cursor-pointer hover:bg-reborn-gray1 duration-200 gap-[8px] ${selectedRoomId === roomInfo.roomId ? 'bg-reborn-gray0' : ''}`}
      onClick={() => {
        changeRoom(roomInfo.roomId);
        changeUser(roomInfo.userId);
      }}
    >
      <div className="w-full h-[24px] flex flex-row items-center flex-shrink-0">
        <div className="flex flex-row font-semibold text-[16px] text-reborn-gray8 gap-[4px] truncate">
          {roomInfo.name}
        </div>
        {roomInfo.booked && (
          <div className="w-[50px] h-[24px] rounded-[4px] border-[1px] border-reborn-gray1 bg-reborn-white text-reborn-orange3 font-medium text-[12px] py-[3px] px-[8px] flex items-center justify-center flex-shrink-0 mx-[4px]">
            예약중
          </div>
        )}
        <div className="min-w-[70px] h-full flex-1 flex text-[14px] text-reborn-gray4 flex-shrink-0 text-right justify-end items-center">
          {`${hour >= 12 ? '오후' : '오전'} ${hour >= 12 ? hour - 12 || 12 : hour || 12}:${date.getMinutes().toString().padStart(2, '0')}`}
        </div>
      </div>
      <div className="flex-1 w-full flex flex-row items-center justify-center gap-[8px]">
        <div className="line-clamp-2 flex-1 break-all">
          {!keyword
            ? roomInfo.lastMessage
            : keywordChager(roomInfo.lastMessage)}
        </div>
        <div
          className={`min-w-[29px] h-[29px] flex items-center justify-center rounded-full font-medium text-[14px] ${roomInfo.unreadCount ? 'bg-reborn-orange3 text-reborn-white' : ''}`}
        >
          {!!roomInfo.unreadCount && roomInfo.unreadCount}
        </div>
      </div>
    </div>
  );
};
