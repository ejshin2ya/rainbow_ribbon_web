import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ButtonOptions {
  onClick: () => void;
  text?: string;
  className?: string;
}

interface ConfirmDialogProps {
  open: boolean;
  header: string;
  paragraph: string;
  customNode: ReactNode;
  confirmOption: ButtonOptions;
  cancelOption?: ButtonOptions;
  closeHandler: () => void;
  openHandler: (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => void;
  setContent: (content: { header: string; paragraph: string }) => void;
  setCustomContent: (content: ReactNode) => void;
}

const ConfirmDialogStore = createContext<Partial<ConfirmDialogProps>>({});

export const ConfirmDialogProvider = function ({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmOption, setConfirmOption] = useState<ButtonOptions>({
    onClick: () => closeHandler(),
    text: '확인',
  });
  const [cancelOption, setCancelOption] = useState<ButtonOptions>();
  const [header, setHeader] = useState<string>('');
  const [paragraph, setParagraph] = useState<string>('');
  const [customNode, setCustomNode] = useState<ReactNode>();
  const closeHandler = function () {
    setOpen(false);
  };
  const openHandler = (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => {
    if (confirmOptions) {
      setConfirmOption(confirmOptions);
    }
    if (cancelOptions) {
      setCancelOption(cancelOptions);
    }
    setOpen(true);
  };
  const setContent = (content: { header: string; paragraph: string }) => {
    setHeader(content.header);
    setParagraph(content.paragraph);
  };
  const setCustomContent = (content: ReactNode) => {
    setCustomNode(content);
  };

  return (
    <ConfirmDialogStore.Provider
      value={{
        open,
        closeHandler,
        openHandler,
        cancelOption,
        confirmOption,
        header,
        paragraph,
        customNode,
        setContent,
        setCustomContent,
      }}
    >
      {children}
    </ConfirmDialogStore.Provider>
  );
};

export const useConfirmDialog: () => ConfirmDialogProps = function () {
  const store = useContext(ConfirmDialogStore);
  if (!store) {
    throw new Error(`useConfirmDialog must use with <ConfirmDialogProvider>.`);
  }
  return store as ConfirmDialogProps;
};
