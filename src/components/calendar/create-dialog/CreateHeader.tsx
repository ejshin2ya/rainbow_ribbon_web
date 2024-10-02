import { ReactComponent as CloseIcon } from 'src/assets/Close.svg';

interface Props {
  onClose: () => void;
}

export const CreateHeader = function ({ onClose }: Props) {
  return (
    <header className="flex flex-row w-full h-[76px] items-center justify-center relative flex-shrink-0 border-b-[4px] border-b-reborn-gray0">
      <h1 className="text-[18px] font-mediu m text-reborn-gray8">예약 추가</h1>
      <button
        className="right-[30px] absolute w-[24px] h-[24px] flex items-center justify-center p-[4.5px]"
        onClick={e => {
          onClose();
        }}
      >
        <CloseIcon className="text-reborn-gray5" />
      </button>
    </header>
  );
};
