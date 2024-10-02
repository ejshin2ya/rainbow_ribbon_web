interface OutputDTO<T = any> {
  statusCode: string;
  msg: string;
  data: T;
}

export interface Alarm {
  id: string;
  userId: string;
  userName: string;
  category: string;
  type: string;
  relateId: string;
  isRead: boolean;
  createAt: string;
}

export type getAlarmCountOutputDTO = OutputDTO<{
  chat: number;
  booking: number;
}>;
export type getAlarmListOutputDTO = OutputDTO<{
  alerts: Alarm[];
  hasMore: boolean;
}>;
