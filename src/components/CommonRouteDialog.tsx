import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dimCloseBlock?: boolean;
  backgroundClass?: string;
}

export const CommonRouteDialog = function ({
  isOpen,
  onClose,
  dimCloseBlock = false,
  children,
  backgroundClass,
}: PropsWithChildren<Props>) {
  if (!isOpen) return null;
  return createPortal(
    <div
      className={`w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-[1200] duration-200 animate-fadeIn ${isOpen ? 'visible' : 'hidden'} ${backgroundClass ? backgroundClass : 'bg-black bg-opacity-50'}`}
      onClick={() => {
        if (dimCloseBlock) return;
        onClose();
      }}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};
