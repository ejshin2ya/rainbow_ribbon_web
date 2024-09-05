import { SubtitleAndDesc } from './SubtitleAndDesc';
import { ReactComponent as BoardIcon } from '../../../assets/Board.svg';

export const ReservationInfo = function () {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <BoardIcon />
        예약 정보
      </h3>
      <div className="flex flex-col gap-[8px]">
        <SubtitleAndDesc desc="2023.11.07 17:40:13" subtitle="결제일시" />
        <SubtitleAndDesc desc="11.15(수)  오전 10:00" subtitle="예약날짜" />
        <SubtitleAndDesc desc="보통 패키지" subtitle="패키지" />
        <SubtitleAndDesc desc="업체 수의함+추억쿠션" />
        <SubtitleAndDesc
          subtitle="총 결제 금액"
          desc="500,000원"
          descClassName={'text-reborn-orange3 font-bold'}
        />
      </div>
    </div>
  );
};
