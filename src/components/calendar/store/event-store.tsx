import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { EventProps } from '../CalendarDetail';

interface FuneralStore {
  selectedEvent: any;
  changeSelectedEvent: (event: any) => void;
  events: EventProps[];
  processedEvents: (EventProps & {
    overlapCount: number;
    overlapIndex: number;
  })[];
}

const FuneralEventStore = createContext<FuneralStore>({
  changeSelectedEvent: () => {},
  events: [],
  selectedEvent: null,
  processedEvents: [],
});

interface Props {
  events: EventProps[];
}

export const FuneralEventProvider = function ({
  children,
  events,
}: PropsWithChildren<Props>) {
  const [selectedEvent, setSelectedEvent] = useState();
  const [processedEvents, setProcessedEvents] = useState<
    (EventProps & { overlapCount: number; overlapIndex: number })[]
  >([]);
  const changeSelectedEvent = function (event: any) {
    setSelectedEvent(event);
  };

  useEffect(function setInitialSelectedEvent() {
    if (events.length) {
      changeSelectedEvent(events[0]);
    }
  }, []);

  useEffect(
    function eventDataChange() {
      // 이벤트 변경 시 여기서 알아서 조정하도록
      let ongoingEvents: any[] = [];
      let lastEndDate: any = null;

      const result = events.map(event => {
        // 이전 이벤트의 종료 시간과 현재 이벤트의 시작 시간을 비교하여 새로운 그룹 시작 확인
        if (lastEndDate && event.startDate >= lastEndDate) {
          ongoingEvents = []; // 새로운 그룹 시작
        }

        // 현재 이벤트 추가
        ongoingEvents.push(event);

        // 현재 그룹의 최대 종료 시간 갱신
        lastEndDate = new Date(
          Math.max(...ongoingEvents.map(e => e.endDate.getTime())),
        );

        // 중첩된 이벤트의 수와 그 그룹 내에서의 순서 계산
        const overlapCount: number = ongoingEvents.length;
        const overlapIndex: number =
          ongoingEvents.findIndex(e => e === event) + 1;

        return {
          ...event,
          overlapCount,
          overlapIndex,
        };
      });
      setProcessedEvents(result);
    },
    [events, events.length],
  );

  return (
    <FuneralEventStore.Provider
      value={{
        selectedEvent,
        changeSelectedEvent,
        events,
        processedEvents,
      }}
    >
      {children}
    </FuneralEventStore.Provider>
  );
};

export const useFuneralEventStore = function () {
  const store = useContext(FuneralEventStore);
  if (!store) {
    throw new Error(
      `useFuneralEventStore must use with <FuneralEventProvider>.`,
    );
  }
  return store;
};
