import { Confirm } from './Confitm';
import { useConfirmDialog } from './confitm-dialog-store';
import { ReservationBlock } from './ReservationBlock';

export const ReservationDialog = function () {
  const { dialogType, open, closeHandler } = useConfirmDialog();
  return (
    <div
      className={`w-full h-full absolute flex items-center justify-center z-[1000] bg-[#000000] bg-opacity-50 duration-200 ${open ? 'visible' : 'hidden'} animate-fadeIn`}
      onClick={e => {
        closeHandler();
      }}
    >
      <div onClick={e => e.stopPropagation()}>
        {dialogType === 'confirm' ? <Confirm /> : <ReservationBlock />}
      </div>
    </div>
  );
};
