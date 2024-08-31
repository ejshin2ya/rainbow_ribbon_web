import { ReactComponent as MemoIcon } from '../../../assets/Memo.svg';

export const Memo = function () {
  return (
    <div className="w-full flex-1">
      <h3 className="font-semibold text-[14px] leading-[17px] mb-[23px] flex flex-row gap-[4px]">
        <MemoIcon />
        메모
      </h3>
      <textarea
        className="w-full px-[12px] py-[10px] rounded-[4px] border-[1px] bg-reborn-gray0 border-reborn-gray1 resize-none focus:outline-none text-[12px] leading-[18px] font-medium"
        placeholder="예약에 대한 메모를 남겨보세요."
        rows={3}
      />
    </div>
  );
};
