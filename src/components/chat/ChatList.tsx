import { useChatList, useChatSearch } from 'src/queries';
import { ChatListItem } from './ChatListItem';
import { ReactComponent as ArrowDownIcon } from '../../assets/ArrowDown.svg';
import { ReactComponent as SearchIcon } from 'src/assets/Search.svg';
import Loader from '../common/Loader';
import { useState } from 'react';

export const ChatList = function () {
  const [keyword, setKeyword] = useState('');
  const { data: roomListData, isLoading } = useChatList();
  const { data: searchData, isFetching: searchLoading } =
    useChatSearch(keyword);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full flex-shrink-0 flex flex-col py-[28px] px-[23.5px] border-b-[1px] border-b-reborn-gray1">
        <div className="text-[14px] font-medium text-[#adadad] mb-[12px]">
          채팅 상담
        </div>
        <div className="mb-[15px] w-full flex flex-row justify-between items-center">
          <div className="w-full h-[27px] flex-1 text-reborn-gray8 text-[18px] font-semibold flex flex-row">
            모든 메세지
            <div className="h-full flex items-center justify-center ml-[4px] cursor-pointer">
              <ArrowDownIcon />
            </div>
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
        <form
          className="w-full h-[40px] flex flex-row items-center rounded-[8px] py-[8px] px-[12px] border-[1px] border-reborn-gray1"
          onSubmit={e => {
            e.preventDefault();
            setKeyword((e.currentTarget[0] as HTMLInputElement).value ?? '');
          }}
        >
          <input
            className="outline-none flex-1 placeholder:text-reborn-gray3"
            placeholder="검색어를 입력해 주세요"
            onChange={e => {
              if (!e.target.value) setKeyword('');
            }}
          />
          <button
            type="submit"
            className="flex-shrink-0 flex items-center justify-center"
          >
            {searchLoading ? (
              <div className="spinner" />
            ) : (
              <SearchIcon className="text-reborn-gray3" />
            )}
          </button>
        </form>
      </header>
      <div className="w-full flex-1 flex flex-col overflow-y-auto">
        {isLoading || searchLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : !keyword ? (
          roomListData?.data.map(roomInfo => {
            return (
              <ChatListItem
                roomInfo={roomInfo}
                key={`${roomInfo.roomId}-${roomInfo.userId}`}
              />
            );
          })
        ) : searchData?.data?.length ? (
          searchData?.data?.map(roomInfo => {
            return (
              <ChatListItem
                roomInfo={roomInfo}
                keyword={keyword}
                key={`${roomInfo.roomId}-${roomInfo.userId}`}
              />
            );
          })
        ) : (
          <div className="w-full flex flex-col items-center px-[25px] pt-[44px] font-medium">
            <h3 className="text-[18px] text-reborn-gray8 mb-[12px]">{`'${keyword}' 검색 결과가 없습니다.`}</h3>
            <span className="text-[16px] text-reborn-gray4">
              단어의 철자가 정확한지 확인해보세요.
            </span>
            <span className="text-[16px] text-reborn-gray4">
              검색어에 포함된 키워드 수를 줄여보거나
            </span>
            <span className="text-[16px] text-reborn-gray4">
              다른 단어로 다시 검색해보세요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
