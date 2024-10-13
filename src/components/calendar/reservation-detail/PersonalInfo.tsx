import { useCalendarBookingDetail } from 'src/queries/reservation';
import { ReactComponent as FaceIcon } from '../../../assets/Person.svg';
import { useFuneralEventStore } from '../store/event-store';

interface InfoProps {
  label?: string;
  value?: string;
}

interface RecordInfoProps {
  date: string;
  title: string;
  price: string;
  status: string;
}

const InfoBox = function ({ label, value }: InfoProps) {
  return (
    <div className={`flex flex-col gap-[8px] ${label ? '' : 'mt-[-16px]'}`}>
      {label && (
        <label className="font-medium text-reborn-gray4">{label}</label>
      )}
      {/* TODO: input이 아니라 일반 Box라고 함 */}
      <div className="rounded-[4px] border-[1.26px] border-reborn-gray1 w-full outline-none py-[6px] px-[12px] text-[12px] h-[32px]">
        {value}
      </div>
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
  const { selectedEvent } = useFuneralEventStore();
  const { data } = useCalendarBookingDetail(selectedEvent);
  return (
    <div className="flex flex-col w-full h-full pt-[31px] pl-[30px] pr-[27px] gap-[20px]">
      <div className="flex flex-row gap-[4px] text-reborn-gray8 text-[14px] leading-[17px] font-semibold mb-[-4px]">
        <FaceIcon width={16} height={16} />
        예약자
      </div>
      <InfoBox label="아이디" value={data?.data.userInfo.id} />
      <InfoBox label="이름" value={data?.data.userInfo.name} />
      <InfoBox label="연락처" value={data?.data.userInfo.phoneNumber} />
      <InfoBox label="주소" value={data?.data.userInfo.address} />
      <InfoBox label="" />
      <InfoBox label="" />
      <div className="overflow-y-auto w-full">
        <h3 className="flex flex-row gap-[4px] text-reborn-gray8 text-[14px] leading-[17px] font-semibold mb-[12px]">
          지난 내역 ({data?.data.userInfo.bookingHistory.length})
        </h3>
        {data?.data.userInfo.bookingHistory.map((booking, idx) => {
          return (
            <RecordInfo
              date={booking.bookingDate}
              price={booking.totalFee
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              status={booking.bookingStatus}
              title={booking.packageName}
              key={`user-history-${idx}`}
            />
          );
        })}
        {/* <RecordInfo
          price={`150,000원`}
          date="2023.06.12 (목)"
          status="완료"
          title="기본패키지"
        /> */}
      </div>
    </div>
  );
};
