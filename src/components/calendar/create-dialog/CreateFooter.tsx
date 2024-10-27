import { useFormContext } from 'react-hook-form';

interface Props {
  btnLoading: boolean;
}

export const CreateFooter = function ({ btnLoading }: Props) {
  const { formState } = useFormContext();
  return (
    <footer className="w-full h-[120px] p-[30px] items-center justify-center flex-shrink-0 border-t-[1px] border-t-reborn-gray1">
      <button
        type="submit"
        className={`w-full h-full rounded-[8px] font-bold text-[18px] duration-200 ${formState.isValid ? 'bg-reborn-orange3 text-reborn-white active:bg-reborn-orange2_4 hover:bg-reborn-orange2_3' : 'bg-reborn-gray1 text-reborn-gray3'}`}
        disabled={!formState.isValid || btnLoading}
      >
        {btnLoading ? '추가 중' : '완료'}
      </button>
    </footer>
  );
};
