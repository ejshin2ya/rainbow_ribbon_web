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
  dialogType: 'confirm' | 'reservationBlock';
  header: string;
  paragraph: string;
  customNode: ReactNode;
  confirmOption: ButtonOptions;
  cancelOption?: ButtonOptions;
  closeHandler: () => void;
  openConfirmHandler: (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => void;
  openBlockHandler: (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => void;
  setContent: (content: { header: string; paragraph: string }) => void;
  setCustomContent: (content: ReactNode) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const ConfirmDialogStore = createContext<Partial<ConfirmDialogProps>>({});

export const ConfirmDialogProvider = function ({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<'confirm' | 'reservationBlock'>(
    'confirm',
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
  const openConfirmHandler = (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => {
    if (confirmOptions) {
      setConfirmOption(confirmOptions);
    }
    if (cancelOptions) {
      setCancelOption(cancelOptions);
    }
    setDialogType('confirm');
    setOpen(true);
  };
  const openBlockHandler = (
    confirmOptions?: ButtonOptions,
    cancelOptions?: ButtonOptions,
  ) => {
    if (confirmOptions) {
      setConfirmOption(confirmOptions);
    }
    if (cancelOptions) {
      setCancelOption(cancelOptions);
    }
    setDialogType('reservationBlock');
    setOpen(true);
  };
  const setContent = (content: { header: string; paragraph: string }) => {
    setHeader(content.header);
    setParagraph(content.paragraph);
  };
  const setCustomContent = (content: ReactNode) => {
    setCustomNode(content);
  };
  const changeSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ConfirmDialogStore.Provider
      value={{
        open,
        closeHandler,
        openConfirmHandler,
        openBlockHandler,
        cancelOption,
        confirmOption,
        header,
        paragraph,
        customNode,
        setContent,
        setCustomContent,
        dialogType,
        selectedDate,
        setSelectedDate: changeSelectedDate,
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
