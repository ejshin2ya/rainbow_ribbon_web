import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { EventProps } from '../CalendarDetail';

type EventArrTypes = EventProps & Record<string, any>;

interface FuneralStore {
  selectedEvent: any;
  changeSelectedEvent: (event: any) => void;
  events: EventProps[];
  processedEvents: EventArrTypes[];
}

const FuneralEventStore = createContext<FuneralStore>({
  changeSelectedEvent: () => {},
  events: [],
  selectedEvent: null,
  processedEvents: [],
});

interface Props {
  events: EventArrTypes[];
}

export const FuneralEventProvider = function ({
  children,
  events,
}: PropsWithChildren<Props>) {
  const [selectedEvent, setSelectedEvent] = useState();
  const [processedEvents, setProcessedEvents] = useState<EventArrTypes[]>([]);
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
      events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      let layers: any[] = [];

      // map을 사용해 각 이벤트에 레이어를 할당
      const eventsWithLayers = events.map(event => {
        let placed = false;

        // 적절한 레이어를 찾기 위해 layers 배열을 순회
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].endDate <= event.startDate) {
            // 해당 레이어에 배치 가능하면
            layers[i] = event; // 레이어의 종료 시간을 현재 이벤트로 업데이트
            event.layer = i; // 해당 레이어 번호를 이벤트에 할당
            placed = true;
            break;
          }
        }

        // 모든 레이어가 겹치는 경우 새로운 레이어 생성
        if (!placed) {
          event.layer = layers.length;
          layers.push(event);
        }

        return event; // 레이어 정보가 추가된 이벤트 반환
      });
      setProcessedEvents(eventsWithLayers);
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
