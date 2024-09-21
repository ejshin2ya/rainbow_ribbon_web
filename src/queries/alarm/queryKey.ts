export const alarmQueryKey = {
  alarmCount() {
    return {
      key: ['alarm', 'count'],
      initialize: ['alarm', 'count'],
    };
  },
  alarmList(category: string, pageNo: number) {
    return {
      key: ['alarm', 'list', category, `${pageNo}`],
      initialize: ['alarm', 'list', category, `${pageNo}`],
    };
  },
};
