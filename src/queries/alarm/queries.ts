import { useQuery } from '@tanstack/react-query';
import { alarmQueryKey } from '.';
import { getAlarmCount, getAlarmList } from 'src/services/alarmService';

/**
 * query
 */
export const useAlarmCount = function () {
  const { key } = alarmQueryKey.alarmCount();
  return useQuery({
    queryKey: key,
    queryFn: () => getAlarmCount(),
  });
};
/**
 * query
 */
export const useAlarmList = function (
  category: 'BOOKING' | 'CHAT',
  pageNo: number,
) {
  const { key } = alarmQueryKey.alarmList(category, pageNo);
  return useQuery({
    queryKey: key,
    queryFn: () => getAlarmList(category, pageNo),
    enabled: !!category,
  });
};
