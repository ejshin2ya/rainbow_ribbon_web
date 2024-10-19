export const alarmQueryKey = {
  alarmCount() {
    return {
      key: ['alarm', 'count'],
      initialize: ['alarm', 'count'],
    };
  },
  alarmList(category: string, lastId: string) {
    return {
      key: ['alarm', 'list', category, `${lastId}`],
      initialize: ['alarm', 'list', category, `${lastId}`],
    };
  },
};
