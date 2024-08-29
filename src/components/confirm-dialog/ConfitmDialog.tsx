import { ButtonGroup } from '../common/ButtonGroup';
import { useConfirmDialog } from './confitm-dialog-store';

export const ConfirmDialog = function () {
  const { header, paragraph, customNode, confirmOption, open, cancelOption } =
    useConfirmDialog();
  return (
    <div
      className={`w-full h-full absolute flex items-center justify-center z-[1000] bg-[#000000] bg-opacity-50 duration-200 ${open ? 'visible' : 'hidden'} animate-fadeIn`}
    >
      <div className="rounded-[10px] flex flex-col gap-[14px] py-[20px] px-[22px] bg-reborn-white w-[314px] h-[190px] items-center justify-center animate-fadeIn">
        {customNode ? (
          customNode
        ) : (
          <>
            <div className="font-medium text-[18px] text-reborn-gray8 w-full text-center mt-[10px]">
              {header}
            </div>
            <div className="text-[16px] text-reborn-gray4 w-full text-center flex-1 px-[20px]">
              {paragraph}
            </div>
          </>
        )}
        <div className="w-full flex-shrink-0 min-h-[40px]">
          <ButtonGroup
            cancelButtonOptions={cancelOption}
            confirmButtonOptions={confirmOption}
          />
        </div>
      </div>
    </div>
  );
};
