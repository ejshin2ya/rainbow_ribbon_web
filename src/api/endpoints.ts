const PROTOCOL = 'https://';
const HOST = 'api-rainbow-ribbon.com';
const DOMAIN = PROTOCOL + HOST;

export const ENDPOINT_USER_AUTH = DOMAIN + '/api/account/user/auth';
export const ENDPOINT_COMPANY_AUTH = DOMAIN + '/api/account/company/auth';
export const ENDPOINT_COMPANY_REGISTRATION =
  DOMAIN + '/api/account/company/info';

export const Domain = {
  PROTOCOL,
  HOST,
  DOMAIN,
  getPath(path: string) {
    if (path.startsWith('/')) return this.DOMAIN + path;
    return `${this.DOMAIN}/${path}`;
  },
};
