import { useChatStore } from './store/chat-store';
import { ReactComponent as ImageIcon } from '../../assets/ImageIcon.svg';
import { ReactComponent as SendIcon } from '../../assets/SendIcon.svg';

export const ChatContent = function () {
  const { selectedRoomId, selectedUserId } = useChatStore();
  return (
    <section className="box-border w-full h-full flex flex-col px-[4px] pb-[27px]">
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
      <main className="w-full flex-1 px-[30px] ">ㅎㅇ</main>
      <footer className="box-border w-full h-[60px] px-[30px] flex-shrink-0">
        <div className="p-[8px] flex flex-row rounded-[12px] bg-reborn-white border-[1px] border-reborn-gray2 items-center">
          <div className="w-[34px] h-[34px] flex-shrink-0 flex items-center justify-center cursor-pointer">
            <ImageIcon />
          </div>
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
