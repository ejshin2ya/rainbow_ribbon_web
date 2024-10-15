import { useChatStore } from './store/chat-store';
import { ReactComponent as ImageIcon } from '../../assets/ImageIcon.svg';
import { ReactComponent as SendIcon } from '../../assets/SendIcon.svg';
import {
  ChangeEvent,
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useChatBookingDetail,
  useChatList,
  useReadMessage,
  useSendImage,
  useSendMessage,
  useStomp,
} from 'src/queries';
import { getAllMessage } from 'src/services/chatService';
import {
  type GetRoomListRes,
  type Message as MessageDTO,
} from 'src/queries/chat/types';
import Loader from '../common/Loader';
import { ReactComponent as NoTalkIcon } from '../../assets/NoTalk.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/ArrowRight.svg';
import { ReactComponent as LogoWhiteIcon } from '../../assets/LogoWhite.svg';
import { useConfirmDialog } from '../confirm-dialog/confitm-dialog-store';
import { conversionDateYearToDay } from 'src/utils/conversion';
import { useQueryClient } from '@tanstack/react-query';
import { chatQueryKey } from 'src/queries/chat/queryKey';
import { IStompSocket } from '@stomp/stompjs';
import { CommonRouteDialog } from '../CommonRouteDialog';
import { ReservationDetail } from '../calendar/reservation-detail/ReservationDetail';

interface MessageProps {
  message: string;
  messageDate: string;
  isSend: boolean;
  messageId: string;
  imgSrc?: string[];
}

const Message = function ({
  isSend,
  message,
  messageId,
  messageDate,
  imgSrc,
}: MessageProps) {
  return (
    <div
      className={`w-full flex ${isSend ? 'flex-row-reverse' : 'flex-row'} items-end gap-[8px] mb-[30px]`}
    >
      <div
        className={`w-fit max-w-[45%] ${!isSend ? 'bg-reborn-white text-reborn-gray8' : 'bg-reborn-orange3 text-reborn-white'} ${!!imgSrc?.length ? '' : 'py-[9px] px-[13px]'} rounded-[4px] text-[18px] font-normal items-end`}
      >
        {!!imgSrc?.length &&
          imgSrc.map((src, idx) => {
            return (
              <img key={`image-${messageId}-${idx}`} alt={src} src={src} />
            );
          })}
        {message}
      </div>
      <div className="h-full flex text-[14px] font-semibold text-reborn-gray3 items-end">
        {messageDate}
      </div>
    </div>
  );
};

export const ChatContent = function () {
  const queryClient = useQueryClient();
  const { selectedRoomId, selectedUserId } = useChatStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messageMap, setMessageMap] = useState<
    Map<string, Map<string, MessageDTO & { images?: string[] }>>
  >(new Map());
  const [pagingData, setPagingData] = useState<
    Map<string, { page: number; hasMore: boolean }>
  >(new Map());
  const [changed, setChanged] = useState(true);

  const { messages } = useStomp();

  const { mutateAsync: send, isPending: sendIsPending } = useSendMessage();
  const { mutateAsync: sendImage, isPending: sendImageIsPending } =
    useSendImage();
  const { mutateAsync: read } = useReadMessage(selectedRoomId);
  const { data: chatListData } = useChatList();
  const { data: reservationData } = useChatBookingDetail(selectedUserId);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { openConfirmHandler, closeHandler, setContent } = useConfirmDialog();

  const fetchMore = async function () {
    const selectedPagingData = pagingData.get(selectedRoomId);
    if (!selectedPagingData || !selectedPagingData.hasMore) return;
    const { data } = await getAllMessage(
      selectedRoomId,
      selectedPagingData.page,
    );
    if (!data || !data.messages.length) return;
    const sortedMessages = data.messages.sort(
      (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    );
    const newDatas: [string, MessageDTO & { images?: string[] }][] =
      sortedMessages.map(msg => [msg.messageId, msg]);
    setMessageMap(prevMap => {
      const newMap = new Map(prevMap);
      const existingRoomMessages = new Map(newMap.get(selectedRoomId) ?? []);
      newDatas.forEach(([id, message]) => {
        existingRoomMessages.set(id, message);
      });
      newMap.set(selectedRoomId, existingRoomMessages);
      return newMap;
    });
    setPagingData(prevPagingData => {
      const newPagingData = new Map(prevPagingData);
      newPagingData.set(selectedRoomId, {
        page: selectedPagingData.page + 1,
        hasMore: data.hasMore,
      });
      return newPagingData;
    });
    return data;
  };

  const sendMessage = async function (messageStr: string) {
    const res = await send({
      roomId: selectedRoomId,
      message: messageStr,
    }).then(res => {
      const { key } = chatQueryKey.chatList();
      const originalChatList = queryClient.getQueryData(key) as GetRoomListRes;
      queryClient.setQueryData(key, {
        msg: originalChatList.msg,
        statusCode: originalChatList.statusCode,
        data: originalChatList.data
          .map(chatRoom => {
            return {
              ...chatRoom,
              lastMessage:
                chatRoom.roomId === selectedRoomId
                  ? messageStr
                  : chatRoom.lastMessage,
              lastMessageDateTime:
                chatRoom.roomId === selectedRoomId
                  ? new Date().toISOString()
                  : chatRoom.lastMessageDateTime,
            };
          })
          .sort(
            (a, b) =>
              new Date(b.lastMessageDateTime).getTime() -
              new Date(a.lastMessageDateTime).getTime(),
          ),
      });
      return res;
    });

    const messageData = res.data;
    const newMap = new Map(messageMap);
    const now = new Date(); // TODO: createAt도 보내달라 요청 후 제거
    const newRoomMessageMap = new Map([
      [
        messageData.messageId,
        {
          ...messageData,
          createAt: messageData.createAt ?? now.toISOString(),
          message: messageData.message ?? messageStr,
        },
      ],
      ...(messageMap.get(selectedRoomId)?.entries() ?? []),
    ]);

    newMap.set(selectedRoomId, newRoomMessageMap);
    setMessageMap(newMap);
  };

  const handleSelectImage = function (e: ChangeEvent<HTMLInputElement>) {
    const validMIMETypes = ['jpg', 'jpeg', 'png', 'pdf'];
    let invalid = false;

    Array.from(e.target.files ?? []).forEach(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!validMIMETypes.includes(fileExtension)) {
        invalid = true;
      }
    });

    if (invalid) {
      setContent({
        paragraph: '지원하지 않는 형식입니다. 파일 형식을 확인해 주세요.',
        header: '',
      });
      openConfirmHandler({
        onClick: () => {
          closeHandler();
        },
        text: '확인',
      });
    } else {
      sendImage({
        roomId: selectedRoomId,
        message: '',
        files: Array.from(e.target.files ?? []),
      })
        .then(res => {
          const { key } = chatQueryKey.chatList();
          const originalChatList = queryClient.getQueryData(
            key,
          ) as GetRoomListRes;
          queryClient.setQueryData(key, {
            msg: originalChatList.msg,
            statusCode: originalChatList.statusCode,
            data: originalChatList.data
              .map(chatRoom => {
                return {
                  ...chatRoom,
                  lastMessage: '사진',
                  lastMessageDateTime: new Date().toISOString(),
                };
              })
              .sort(
                (a, b) =>
                  new Date(b.lastMessageDateTime).getTime() -
                  new Date(a.lastMessageDateTime).getTime(),
              ),
          });
          return res;
        })
        .then(res => {
          const messageData = res.data;
          const newMap = new Map(messageMap);
          const now = new Date(); // TODO: createAt도 보내달라 요청 후 제거
          const newRoomMessageMap = new Map([
            [
              messageData.messageId,
              {
                ...messageData,
                createAt: messageData.createAt ?? now.toISOString(),
                message: messageData.message ?? '',
              },
            ],
            ...(messageMap.get(selectedRoomId)?.entries() ?? []),
          ]);

          newMap.set(selectedRoomId, newRoomMessageMap);
          setMessageMap(newMap);
          return res;
        })
        .then(res => {
          setTimeout(() => {
            scrollToBottom();
          }, 0);
        });
    }
    e.target.value = '';
  };

  const messageArray = Array.from(
    messageMap.get(selectedRoomId)?.values() ?? [],
  ).reverse();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const loadMoreMessages = async () => {
    if (!chatContainerRef.current || isLoading) return;
    const previousScrollHeight =
      chatContainerRef.current.scrollHeight -
      chatContainerRef.current.scrollTop -
      50;
    setIsLoading(true);
    const selectedPagingData = pagingData.get(selectedRoomId);
    if (selectedPagingData && selectedPagingData.hasMore) {
      await fetchMore();
    }
    setIsLoading(false);
    const newScrollHeight = chatContainerRef.current.scrollHeight;
    chatContainerRef.current.scrollTop = newScrollHeight - previousScrollHeight;
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current;
      if (
        scrollTop <= 10 &&
        !isLoading &&
        pagingData.get(selectedRoomId)?.hasMore
      ) {
        loadMoreMessages();
      }
    }
  };

  // 첫 fetch 실행부
  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (!selectedRoomId) return;
      if (!messageMap.has(selectedRoomId)) {
        setMessageMap(prevMap =>
          new Map(prevMap).set(selectedRoomId, new Map()),
        );
        setPagingData(prevData =>
          new Map(prevData).set(selectedRoomId, { page: 0, hasMore: true }),
        );
      }
      const selectedPagingData = pagingData.get(selectedRoomId);
      if (selectedPagingData && selectedPagingData.page === 0) {
        await fetchMore();
      }
    };
    fetchInitialMessages();
  }, [selectedRoomId, pagingData]);

  // selectedRoomId로 만들어진 data들이 있는 경우 필요한 로직
  useEffect(() => {
    if (
      chatListData?.data.find(room => room.roomId === selectedRoomId)
        ?.unreadCount
    ) {
      read({ roomId: selectedRoomId });
    }
    if (!pagingData.get(selectedRoomId)) setChanged(true);
    scrollToBottom();
  }, [selectedRoomId]);

  // initial fetch 이후 scroll을 위해 필요
  useEffect(() => {
    if (changed) {
      scrollToBottom();
      setChanged(false);
    }
  }, [messageArray.length]);

  useEffect(() => {
    // 메세지 수신
    setMessageMap(prevMap => {
      const newMap = new Map(prevMap);
      messages.forEach(msg => {
        const existingRoomMessages = new Map(newMap.get(msg.roomId) ?? []);
        const { messageId: id } = msg;
        existingRoomMessages.set(id, msg);
        newMap.set(selectedRoomId, existingRoomMessages);
      });
      return newMap;
    });
  }, [messages.length]);

  return (
    <section className="box-border w-full h-full flex flex-col relative border-l-[1px] border-l-reborn-gray1">
      <CommonRouteDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <ReservationDetail
          reservationInfo={reservationData?.data}
          selectedEventId={reservationData?.data?.bookingInfo?.bookingId ?? ''}
        />
      </CommonRouteDialog>
      {Array.isArray(chatListData?.data) && chatListData?.data.length ? (
        <>
          <header className="w-full h-[82px] px-[30px] border-b-[1px] border-b-reborn-gray2 flex flex-row items-center gap-[12px] flex-shrink-0">
            <span className="font-semibold text-[18px] text-reborn-gray8">
              {
                chatListData.data.find(room => room.userId === selectedUserId)
                  ?.name
              }
            </span>
            {reservationData?.data &&
            reservationData.data.bookingInfo.bookingStatus !== '예약 취소' ? (
              <>
                <span className="font-medium text-[14px] text-reborn-gray4">
                  {conversionDateYearToDay(
                    reservationData?.data?.bookingInfo?.bookingDate ?? '',
                  )}
                </span>
                <span className="w-[1px] h-[16px] border-l-[1px] border-l-reborn-gray3" />
                <span className="font-medium text-[14px] text-reborn-gray4">
                  {reservationData.data.bookingInfo.packageName}
                </span>
                <span
                  className="font-medium text-[14px] text-reborn-gray4 h-[21px] w-[21px] cursor-pointer flex items-center justify-items-center"
                  onClick={() => setDialogOpen(true)}
                >
                  <ArrowRightIcon />
                </span>
              </>
            ) : (
              <span className="font-medium text-[14px] text-reborn-gray4">
                예약 정보가 없습니다.
              </span>
            )}
          </header>
          <main className="w-full h-[1px] flex-1">
            <div
              ref={chatContainerRef}
              className="w-full h-full overflow-y-auto flex flex-col pt-[30px] px-[30px]"
              onScroll={handleScroll}
            >
              {pagingData.get(selectedRoomId)?.hasMore && (
                <div className="w-full mb-[30px]">
                  <Loader />
                </div>
              )}
              {!!selectedRoomId &&
                messageArray.map((message, index) => {
                  const date = new Date(message.createAt);
                  const hours = date.getHours() % 12 || 12;
                  const minutes = date.getMinutes() || 0;
                  const ampm = date.getHours() >= 12 ? '오후' : '오전';
                  const minutesFormatted =
                    minutes < 10 ? `0${minutes}` : minutes;
                  const beforeDate =
                    index > 0
                      ? new Date(messageArray[index - 1].createAt)
                      : date;
                  const showDate =
                    index === 0 ||
                    date.getFullYear() !== beforeDate.getFullYear() ||
                    date.getMonth() !== beforeDate.getMonth() ||
                    date.getDate() !== beforeDate.getDate();
                  return createElement(Fragment, {
                    children: (
                      <>
                        {showDate && (
                          <div className="h-[37px] flex items-center justify-center text-reborn-gray4 mb-[30px]">
                            {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
                          </div>
                        )}
                        <Message
                          isSend={message.receiverId === selectedUserId}
                          message={message.message}
                          messageId={message.messageId}
                          messageDate={`${ampm} ${hours}:${minutesFormatted}`}
                          imgSrc={message.images}
                        />
                      </>
                    ),
                    key: `${message.roomId}-${message.messageId}`,
                  });
                })}
            </div>
          </main>
          <footer className="box-border w-full h-[60px] flex-shrink-0">
            <form
              className="p-[8px] flex flex-row bg-reborn-white border-t-[1px] border-reborn-gray2 items-center"
              onSubmit={async e => {
                e.preventDefault();
                await sendMessage(
                  (e.currentTarget[1] as HTMLInputElement).value ?? '',
                );
                (e.target as typeof e.currentTarget).reset();
                setTimeout(() => {
                  scrollToBottom();
                }, 0);
              }}
            >
              <label
                htmlFor="image-upload"
                className="w-[34px] h-[34px] flex-shrink-0 flex items-center justify-center cursor-pointer"
              >
                <ImageIcon color="#d6d6d6" />
              </label>
              <input
                type="file"
                id="image-upload"
                multiple
                onChange={handleSelectImage}
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: 'none' }}
              />
              <input
                className={`h-full flex-1 px-[10px] outline-none`}
                placeholder="메시지를 입력하세요."
              />
              <button
                className={`w-[44px] h-[44px] flex-shrink-0 flex items-center justify-center rounded-[12px] bg-reborn-gray7 ${sendIsPending || sendImageIsPending ? 'cursor-wait' : 'cursor-pointer'}`}
                disabled={sendIsPending || sendImageIsPending}
              >
                {sendIsPending || sendImageIsPending ? (
                  <div className="spinner" />
                ) : (
                  <SendIcon style={{ color: '#fff' }} />
                )}
              </button>
            </form>
          </footer>
        </>
      ) : Array.isArray(chatListData?.data) ? (
        <div className="w-full h-full flex items-center justify-center flex-col gap-[10px]">
          <NoTalkIcon width={46} height={64} />
          <span className="text-reborn-gray3 text-[20px] font-medium">
            진행한 상담이 없어요
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LogoWhiteIcon width={240} height={36} />
        </div>
      )}
    </section>
  );
};
