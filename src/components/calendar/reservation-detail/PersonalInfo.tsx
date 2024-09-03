import { ReactComponent as FaceIcon } from '../../../assets/Person.svg';

interface InputProps {
  label?: string;
  placeholder?: string;
}

interface RecordInfoProps {
  date: string;
  title: string;
  price: string;
  status: '완료';
}

const InputInfo = function ({ label, placeholder }: InputProps) {
  return (
    <div className={`flex flex-col gap-[8px] ${label ? '' : 'mt-[-16px]'}`}>
      {label && (
        <label className="font-medium text-reborn-gray4">{label}</label>
      )}
      {/* TODO: input이 아니라 일반 Box라고 함 */}
      <input
        className="rounded-[4px] border-[1.26px] border-reborn-gray1 w-full outline-none py-[6px] px-[12px] text-[12px]"
        placeholder={placeholder}
      />
    </div>
  );
};

const RecordInfo = function ({ price, date, status, title }: RecordInfoProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex flex-col gap-[4px] text-[12px] leading-[18px] font-medium">
        <div>{date}</div>
        <div>{title}</div>
        <div className="text-reborn-gray8">{price}</div>
      </div>
      <div className="rounded-[4px] px-[6px] py-[2px] bg-reborn-gray1 text-reborn-gray4 w-fit text-[10px] leading-[15px]">
        {status}
      </div>
    </div>
  );
};

export const PersonalInfo = function () {
  return (
    <div className="flex flex-col w-full h-full pt-[31px] pl-[30px] pr-[27px] gap-[20px]">
      <div className="flex flex-row gap-[4px] text-reborn-gray8 text-[14px] leading-[17px] font-semibold mb-[-4px]">
        <FaceIcon width={16} height={16} />
        예약자
      </div>
      <InputInfo label="아이디" placeholder="아이디" />
      <InputInfo label="이름" placeholder="이름" />
      <InputInfo label="연락처" placeholder="연락처" />
      <InputInfo label="주소" placeholder="12345" />
      <InputInfo label="" placeholder="OO시 OO동 1234" />
      <InputInfo label="" placeholder="OO동 OO호" />
      <div className="overflow-y-auto w-full">
        <h3 className="flex flex-row gap-[4px] text-reborn-gray8 text-[14px] leading-[17px] font-semibold mb-[12px]">
          지난 내역 (2)
        </h3>
        <RecordInfo
          price={`150,000원`}
          date="2023.06.12 (목)"
          status="완료"
          title="기본패키지"
        />
        <RecordInfo
          price={`150,000원`}
          date="2023.06.12 (목)"
          status="완료"
          title="기본패키지"
        />
        <RecordInfo
          price={`150,000원`}
          date="2023.06.12 (목)"
          status="완료"
          title="기본패키지"
        />
      </div>
    </div>
  );
};
