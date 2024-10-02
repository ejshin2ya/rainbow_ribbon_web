import { Domain } from 'src/api/endpoints';

class AlarmDomain {
  /**
   * @description get
   */
  alarmList(category: 'BOOKING' | 'CHAT', pageNo: number) {
    return Domain.getPath(
      `/api/alert/list?category=${category}&pageNo=${pageNo}`,
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
