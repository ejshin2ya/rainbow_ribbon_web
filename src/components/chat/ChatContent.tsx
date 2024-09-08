import { useChatStore } from './store/chat-store';
import { ReactComponent as ImageIcon } from '../../assets/ImageIcon.svg';
import { ReactComponent as SendIcon } from '../../assets/SendIcon.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAllMessage } from 'src/queries';

interface MessageProps {
  message: string;
  messageDate: string;
  isSend: boolean;
}

const Message = function ({ isSend, message, messageDate }: MessageProps) {
  return (
    <div
      className={`w-full flex ${isSend ? 'flex-row-reverse' : 'flex-row'} items-end gap-[8px] mb-[30px]`}
    >
      <div
        className={`w-fit max-w-[45%] ${!isSend ? 'bg-reborn-white text-reborn-gray8' : 'bg-reborn-orange3 text-reborn-white'} py-[9px] px-[13px] rounded-[4px] text-[18px] font-normal`}
      >
        {message}
      </div>
      <div className="h-full flex text-[14px] font-semibold text-reborn-gray3">
        {messageDate}
      </div>
    </div>
  );
};

export const ChatContent = function () {
  const { selectedRoomId, selectedUserId } = useChatStore();
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  // TODO: State로 채팅을 변경해야 할 것으로 보임.
  const { data, isLoading } = useAllMessage(selectedRoomId, page);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [data?.data]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      // 스크롤이 위에 도달하면
      if (scrollTop === 0 && !isLoading) {
        // TODO: pagination 관련 쿼리
        // setPage(prev => prev + 1);
      }
    }
  };

  const handleSelectImage = function (e: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(Array.from(e.target.files ?? []));
  };

  if (!data) {
    return <div>로딩 중입니다...</div>;
  }

  return (
    <section className="box-border w-full h-full flex flex-col px-[4px] pb-[27px] relative">
      <header className="w-full h-[82px] px-[30px] border-b-[1px] border-b-reborn-gray2 flex flex-row items-center gap-[12px] flex-shrink-0">
        <span className="font-semibold text-[18px] text-reborn-gray8">
          {selectedUserId}
        </span>
        <span className="font-medium text-[14px] text-reborn-gray4">
          2024.01.03 (수)
        </span>
        <span className="w-[1px] h-[16px] border-l-[1px] border-l-reborn-gray3" />
        <span className="font-medium text-[14px] text-reborn-gray4">
          기본 패키지 + 픽업 서비스
        </span>
        <span className="font-medium text-[14px] text-reborn-gray4 h-[21px] w-[21px] cursor-pointer">
          {`>`}
        </span>
      </header>
      <main
        ref={chatContainerRef}
        className="w-full h-[1px] flex-1 px-[30px] overflow-y-auto"
        onScroll={handleScroll}
      >
        {data?.data?.map((message, index) => {
          const date = new Date(message.createAt);
          const hours = date.getHours() % 12 || 12;
          const minutes = date.getMinutes() || 0;
          const ampm = date.getHours() >= 12 ? '오후' : '오전';
          const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
          const beforeDate =
            index > 0 ? new Date(data?.data[index - 1].createAt) : date;
          const showDate =
            !index ||
            date.getFullYear() !== beforeDate.getFullYear() ||
            date.getMonth() !== beforeDate.getMonth() ||
            date.getDate() !== beforeDate.getDate();

          return (
            <>
              {showDate && (
                <div className="h-[37px] flex items-center justify-center text-reborn-gray4">
                  2024년 1월 2일
                </div>
              )}
              <Message
                isSend={message.receiverId !== selectedUserId}
                message={message.message}
                messageDate={`${ampm} ${hours}:${minutesFormatted}`}
              />
            </>
          );
        })}

        <div ref={messageEndRef} />
      </main>
      {!!selectedFile.length && (
        <div className="h-[100px] absolute bottom-[95px] left-[30px] right-[30px] flex items-center">
          <div className="w-full h-full bg-opacity-50 bg-reborn-gray3 flex flex-row items-center rounded-[4px] p-[8px] gap-[8px]">
            {selectedFile.map(file => {
              return (
                <div className="max-w-[100px] h-full">
                  <img
                    className="h-full bg-reborn-gray8 bg-opacity-50 rounded-[4px]"
                    alt={file.name}
                    src={URL.createObjectURL(file)}
                  />
                </div>
              );
            })}
            <button onClick={() => setSelectedFile([])}>취소</button>
          </div>
        </div>
      )}
      <footer className="box-border w-full h-[60px] px-[30px] flex-shrink-0">
        <div className="p-[8px] flex flex-row rounded-[12px] bg-reborn-white border-[1px] border-reborn-gray2 items-center">
          <label
            htmlFor="image-upload"
            className="w-[34px] h-[34px] flex-shrink-0 flex items-center justify-center cursor-pointer"
          >
            <ImageIcon />
          </label>
          <input
            type="file"
            id="image-upload"
            multiple
            onChange={handleSelectImage}
            accept="image/*, video/*"
            style={{ display: 'none' }}
          />
          <input
            className="h-full flex-1 px-[10px] outline-none"
            placeholder="메시지를 입력하세요."
          />
          <div className="w-[44px] h-[44px] flex-shrink-0 flex items-center justify-center rounded-[12px] bg-reborn-gray7 cursor-pointer">
            <SendIcon />
          </div>
        </div>
      </footer>
    </section>
  );
};
