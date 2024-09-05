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
      <main className="w-full flex-1 px-[30px]">
        <div className="w-full h-[37px] flex items-center justify-center text-reborn-gray4">
          2024년 1월 2일
        </div>
        <div className="w-full flex flex-row items-end gap-[8px] mb-[30px]">
          <div className="w-fit max-w-[45%] bg-reborn-white text-reborn-gray8 py-[9px] px-[13px] rounded-[4px] text-[18px] font-normal">
            추모식에서 미미의 사진을 함께 놓을 수 있을까요? 추모식에서 미미의
            사진을 함께 놓을 수 있을까요? 추모식에서 미미의 사진을 함께 놓을 수
            있을까요? 추모식에서 미미의 사진을 함께 놓을 수 있을까요? 추모식에서
            미미의 사진을 함께 놓을 수 있을까요?
          </div>
          <div className="h-full flex text-[14px] font-semibold text-reborn-gray3">
            오후 7:30
          </div>
        </div>
        <div className="w-full flex flex-row-reverse items-end gap-[8px] mb-[30px]">
          <div className="w-fit max-w-[45%] bg-reborn-orange3 text-reborn-white py-[9px] px-[13px] rounded-[4px] text-[18px] font-normal">
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
            예약이 성공적으로 확정되었습니다. 예약이 성공적으로 확정되었습니다.
          </div>
          <div className="h-full flex text-[14px] font-semibold text-reborn-gray3">
            오후 7:40
          </div>
        </div>
      </main>
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
