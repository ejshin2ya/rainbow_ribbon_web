import { ReactNode } from 'react';

interface ButtonOptions {
  onClick: () => any;
  text?: string | ReactNode;
  className?: string;
  disabled?: boolean;
}
interface Props {
  cancelButtonOptions?: ButtonOptions;
  confirmButtonOptions?: ButtonOptions;
  beforeConfirmCallback?: () => any;
  afterConfirmCallback?: () => any;
  beforeCancelCallback?: () => any;
  afterCancelCallback?: () => any;
}
export const ButtonGroup = function ({
  cancelButtonOptions,
  confirmButtonOptions,
  afterCancelCallback,
  afterConfirmCallback,
  beforeCancelCallback,
  beforeConfirmCallback,
}: Props) {
  return (
    <div className="w-full h-full flex flex-row space-between gap-[12px]">
      {cancelButtonOptions && (
        <button
          onClick={async () => {
            await beforeCancelCallback?.();
            await cancelButtonOptions?.onClick?.();
            await afterCancelCallback?.();
          }}
          className={`flex-1 h-full flex items-center justify-center font-medium text-[14px] leading-[21px] border-reborn-gray2 text-reborn-gray4 border-[1px] rounded-[4px] py-[5px] px-[10px] hover:bg-reborn-gray0 active:bg-reborn-gray1 duration-200 ${cancelButtonOptions.className}`}
          disabled={cancelButtonOptions.disabled ?? false}
        >
          {cancelButtonOptions.text}
        </button>
      )}
      {confirmButtonOptions && (
        <button
          onClick={async () => {
            await beforeConfirmCallback?.();
            await confirmButtonOptions?.onClick?.();
            await afterConfirmCallback?.();
          }}
          className={`flex-1 h-full flex items-center justify-center font-medium text-[14px] leading-[21px] text-reborn-white rounded-[4px] py-[5px] px-[10px] bg-reborn-orange3 hover:bg-reborn-orange2_3 active:bg-reborn-orange2_4 duration-200 ${confirmButtonOptions.className}`}
          disabled={confirmButtonOptions.disabled ?? false}
        >
          {confirmButtonOptions.text}
        </button>
      )}
    </div>
  );
};
