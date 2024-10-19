import { Domain } from 'src/api/endpoints';

class AlarmDomain {
  /**
   * @description get
   */
  alarmList(category: 'BOOKING' | 'CHAT', lastId: string) {
    return Domain.getPath(
      `/api/alert/list?category=${category}&lastId=${lastId}`,
    );
  }
  /**
   * @description get
   */
  get alarmCount() {
    return Domain.getPath(`/api/alert/count`);
  }
}

export const alarmDomain = new AlarmDomain();
