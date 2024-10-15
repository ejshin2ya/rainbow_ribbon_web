import { useFormContext } from 'react-hook-form';

export const CreateFooter = function () {
  const { formState } = useFormContext();
  return (
    <footer className="w-full h-[120px] p-[30px] items-center justify-center flex-shrink-0 border-t-[1px] border-t-reborn-gray1">
      <button
        type="submit"
        className={`w-full h-full rounded-[8px] font-bold text-[18px] ${formState.isDirty ? 'bg-reborn-orange3 text-reborn-white' : 'bg-reborn-gray1 text-reborn-gray3'}`}
        disabled={!formState.isDirty}
      >
        완료
      </button>
    </footer>
  );
};
