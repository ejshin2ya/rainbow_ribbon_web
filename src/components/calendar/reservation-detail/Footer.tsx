import { useState } from 'react';
import { ButtonGroup } from 'src/components/common/ButtonGroup';
import { useConfirmDialog } from 'src/components/confirm-dialog/confitm-dialog-store';
import { ReservationDefaultParams } from './ReservationDetail';
import { useChangeBookingStatus } from 'src/queries/reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyInfo } from 'src/services/companyService';

export const Footer = function ({
  reservationInfo,
  selectedEventId,
}: ReservationDefaultParams) {
  const { openConfirmHandler, closeHandler, setContent } = useConfirmDialog();
  const [sendTalk, setSendTalk] = useState(false);
  const toggleSwitch = function () {
    setSendTalk(prev => !prev);
  };
  const { mutateAsync } = useChangeBookingStatus();
  // TODO: company query 개발 시 해당 쿼리문으로 대체
  const { data } = useQuery({
    queryKey: ['company'],
    queryFn: () => {
      return getCompanyInfo()
        .then(res => {
          // TODO: 삭제
          console.log(res);
          return {
            weekdayOpen: res.data.weekdayOpen,
            weekdayClose: res.data.weekdayClose,
            weekendOpen: res.data.weekendOpen,
            weekendClose: res.data.weekendClose,
            parallel: res.data.parallel,
          };
        })
        .catch(() => {
          return {
            weekdayOpen: 7,
            weekdayClose: 24,
            weekendOpen: 7,
            weekendClose: 24,
            parallel: 1,
          };
        });
    },
  });
  return (
    <footer className="w-full h-full flex flex-row justify-between py-[26px] px-[28px] items-center">
      <div className="w-[50%] h-full flex flex-col items-start justify-center">
        <div className="flex flex-row gap-[8px]">
          <div className="font-medium text-[14px] leading-[17px] text-reborn-gray8">
            알림톡 발송
          </div>
          <div className="w-[30px] h-[16px] flex items-center justify-center">
            <div
              onClick={toggleSwitch}
              className={`w-full h-full flex items-center px-[2px] rounded-full cursor-pointer transition-colors duration-[0.2s] ${sendTalk ? 'bg-reborn-orange3' : 'bg-reborn-gray3'}`}
            >
              <div
                className={`bg-white w-[12px] h-[12px] rounded-full shadow-md transform transition-transform duration-[0.2s] ${sendTalk ? 'translate-x-[14px]' : ''}`}
              />
            </div>
          </div>
        </div>
        <div className="font-medium text-[12px] leading-[18px] text-reborn-gray4">
          예약 확정을 알리는 알림톡이 고객에게 발송됩니다.
        </div>
      </div>
      <div className="w-[50%] h-full">
        <ButtonGroup
          cancelButtonOptions={{
            onClick: () => {
              setContent({
                header: '정말 거절하시겠어요?',
                paragraph:
                  '거절 후에는 복구할 수 없습니다. 신중히 선택해주세요.',
              });
              openConfirmHandler(
                {
                  text: '거절 하기',
                  onClick: () => {
                    mutateAsync({
                      bookingId: selectedEventId,
                      sendAlert: sendTalk,
                      status: 'no',
                    }).finally(() => {
                      closeHandler();
                    });
                  },
                },
                {
                  text: '아니요',
                  onClick: () => {
                    closeHandler();
                  },
                },
              );
            },
            className: '',
            text: '예약 거절',
          }}
          confirmButtonOptions={{
            onClick: () => {
              mutateAsync({
                bookingId: selectedEventId,
                sendAlert: sendTalk,
                status: 'yes',
              }).then(() => {
                const maxCount = data?.parallel ?? 1;
                // TODO: api 혹은 response로 보내달라고 요청하였음.
                // if (maxCount)
              });
              setContent({
                header: '이후 예약을 제한하시겠어요?',
                paragraph: '최대 예약 3건으로, 이후 예약을 제한해 드립니다.',
              });
              openConfirmHandler(
                {
                  text: '예약 제한',
                  onClick: () => {
                    closeHandler();
                  },
                },
                {
                  text: '아니요',
                  onClick: () => {
                    closeHandler();
                  },
                },
              );
            },
            className: '',
            text: '예약 확정',
          }}
        />
      </div>
    </footer>
  );
};
