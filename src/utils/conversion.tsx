export const conversionYearMonth = function (age: string) {
  if (!age) return '';
  const regex = /(\d+y)?(\d+m)?/;
  const match = age.match(regex);
  if (!match) return '';
  const years = match[1]?.replace('y', '년') ?? '';
  const months = match[2]?.replace('m', '개월') ?? '';
  return `${years}${years && months ? ' ' : ''}${months}`.trim();
};

/**
 * @param dateString ISODateString
 * @returns `yyyy.MM.dd hh:mm:ss`
 */
export const conversionFullDateTime = function (dateString: string): string {
  if (!dateString) return '날짜 정보가 없습니다.';
  const date = new Date(dateString);

  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}.${MM}.${dd} ${hh}:${mm}:${ss}`;
};

/**
 * @param dateString ISODateString
 * @returns `MM.dd(E) a hh:mm`
 */
export const conversionDateDayATime = function (dateString: string): string {
  if (!dateString) return '날짜 정보가 없습니다.';
  const date = new Date(dateString);

  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const E = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const hh = date.getHours();
  const a = hh >= 12 ? '오후' : '오전';
  const mm = String(date.getMinutes()).padStart(2, '0');

  return `${MM}.${dd}(${E}) · ${a} ${hh % 12 || 12}:${mm}`;
};

/**
 * @param dateString ISODateString
 * @returns `yyyy.MM.dd (E)`
 */
export const conversionDateYearToDay = function (dateString: string): string {
  if (!dateString) return '날짜 정보가 없습니다.';
  const date = new Date(dateString);

  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const E = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${yyyy}.${MM}.${dd} (${E})`;
};

/**
 * @param dateString ISODateString
 * @returns `yyyy.MM.dd || a hh:mm`
 */
export const conversionAlarmDate = function (dateString): string {
  if (!dateString) return '날짜 정보가 없습니다.';
  const date = new Date(dateString);
  const today = new Date();
  const hourDiff = (today.getTime() - date.getTime()) / (60 * 60 * 1000);
  if (hourDiff > 24) {
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${MM}.${dd}`;
  } else {
    const hh = date.getHours();
    const mm = String(date.getMinutes()).padStart(2, '0');
    const a = hh >= 12 ? '오후' : '오전';
    return `${a} ${hh % 12 || 12}:${mm}`;
  }
};

/**
 * @param dateString ISODateString
 * @returns `yyyy.MM.dd || a hh:mm`
 */
export const conversionNormalDate = function (dateString): string {
  if (!dateString) return '날짜 정보가 없습니다.';
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1);
  const dd = String(date.getDate());
  return `${yyyy}년 ${MM}월 ${dd}일`;
};
