import { SubtitleAndDesc } from './SubtitleAndDesc';

export const PetInfo = function () {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px]">
        반려동물 정보
      </h3>
      <div className="flex flex-col gap-[8px]">
        <SubtitleAndDesc subtitle="이름" desc="나비" />
        <SubtitleAndDesc subtitle="체중" desc="5kg" />
        <SubtitleAndDesc subtitle="구분" desc="고양이 (페르시안)" />
        <SubtitleAndDesc subtitle="나이" desc="12년 2개월" />
      </div>
    </div>
  );
};
