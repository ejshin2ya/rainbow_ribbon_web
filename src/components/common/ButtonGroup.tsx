interface ButtonOptions {
  onClick: () => void;
  text?: string;
  className?: string;
}
interface Props {
  cancelButtonOptions?: ButtonOptions;
  confirmButtonOptions?: ButtonOptions;
}
export const ButtonGroup = function ({
  cancelButtonOptions,
  confirmButtonOptions,
}: Props) {
  return (
    <div className="w-full h-full flex flex-row space-between gap-[12px]">
      {cancelButtonOptions && (
        <button
          onClick={cancelButtonOptions.onClick}
          className={`flex-1 h-full flex items-center justify-center font-medium text-[14px] leading-[21px] border-reborn-gray2 text-reborn-gray4 border-[1px] rounded-[4px] py-[5px] px-[10px] ${cancelButtonOptions.className}`}
        >
          {cancelButtonOptions.text}
        </button>
      )}
      {confirmButtonOptions && (
        <button
          onClick={confirmButtonOptions.onClick}
          className={`flex-1 h-full flex items-center justify-center font-medium text-[14px] leading-[21px] text-reborn-white rounded-[4px] py-[5px] px-[10px] bg-reborn-orange3 ${confirmButtonOptions.className}`}
        >
          {confirmButtonOptions.text}
        </button>
      )}
    </div>
  );
};
