const PROTOCOL = 'https://';
const HOST = 'api-rainbow-ribbon.com';
const DOMAIN = PROTOCOL + HOST;

export const ENDPOINT_USER_PHONE_VERIFY =
  DOMAIN + '/api/no-auth/account/user/phone/verify';
export const ENDPOINT_COMPANY_AUTH = DOMAIN + '/api/no-auth/account/company';
export const ENDPOINT_COMPANY_LOGIN =
  DOMAIN + '/api/no-auth/account/company/login';
export const ENDPOINT_COMPANY_REGISTRATION =
  DOMAIN + '/api/account/company/info';
export const ENDPOINT_FUNERAL_COMPOSITION =
  DOMAIN + '/api/account/company/funeral';

export const Domain = {
  PROTOCOL,
  HOST,
  DOMAIN,
  getPath(path: string) {
    if (path.startsWith('/')) return this.DOMAIN + path;
    return `${this.DOMAIN}/${path}`;
  },
};
