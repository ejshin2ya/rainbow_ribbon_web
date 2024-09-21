import api from 'src/api/axios';
import {
  alarmDomain,
  getAlarmCountOutputDTO,
  getAlarmListOutputDTO,
} from 'src/queries/alarm';

export const getAlarmCount = async function () {
  return (
    await api<getAlarmCountOutputDTO>({
      method: 'get',
      url: alarmDomain.alarmCount,
    })
  ).data;
};

export const getAlarmList = async function (
  category: 'BOOKING' | 'CHAT',
  pageNo: number,
) {
  return (
    await api<getAlarmListOutputDTO>({
      method: 'get',
      url: alarmDomain.alarmList(category, pageNo),
    })
  ).data;
};
