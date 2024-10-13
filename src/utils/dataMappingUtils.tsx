import { CompanyInfo } from '../services/companyService';
import { RegistrationData } from '../atoms/registrationDataState';
import { FuneralInfo } from '../services/FuneralCompositionService';
import { FuneralCompositionState } from '../atoms/funeralCompositionState';

export const mapCompanyInfoToRegistrationData = (
  companyInfo: Partial<CompanyInfo>,
): RegistrationData => ({
  companyInfoEditReq: {
    companyName: companyInfo.companyName ?? '',
    contact: companyInfo.contact ?? '',
    postalCode: companyInfo.postalCode ?? '',
    address: companyInfo.address ?? '',
    addressDetail: companyInfo.addressDetail ?? '',
    offDay: companyInfo.offDay ?? [],
    weekdayOpen: companyInfo.weekdayOpen ?? '',
    weekdayClose: companyInfo.weekdayClose ?? '',
    weekendOpen: companyInfo.weekendOpen ?? '',
    weekendClose: companyInfo.weekendClose ?? '',
    parallel: companyInfo.parallel ?? 0,
    notification: companyInfo.notification ?? '',
  },
  logoImage: companyInfo.logoImage ?? null,
});

export const mapFuneralInfoToFuneralComposition = (
  funeralInfo: Partial<FuneralInfo>,
): FuneralCompositionState => ({
  funeralInfoUpdateReq: {
    funeralDescription: funeralInfo.funeralDescription ?? '',
    durationMin: funeralInfo.durationMin ?? 0,
    shroudDescription: funeralInfo.shroudDescription ?? '',
    shroudPrice: funeralInfo.shroudPrice ?? 0,
    hasMemorial: funeralInfo.hasMemorial ?? false,
    memorialPrice: funeralInfo.memorialPrice ?? 0,
  },
  funeralImage: funeralInfo.funeralImage ?? null,
  shroudCoffinImage: funeralInfo.shroudImage ?? null,
  memorialImage: funeralInfo.memorialImages ?? [],
});

export const isValidCompanyInfo = (info: Partial<CompanyInfo>): boolean => {
  const requiredFields = [
    'companyName',
    'contact',
    'postalCode',
    'address',
    'offDay',
    'weekdayOpen',
    'weekdayClose',
    'notification',
    'logoImage',
  ];

  return requiredFields.some(
    field =>
      info[field] !== null &&
      info[field] !== undefined &&
      info[field] !== '' &&
      (field !== 'offDay' || (info[field] as any[]).length > 0) &&
      (field !== 'parallel' || (info[field] as number) > 0),
  );
};

export const isValidFuneralInfo = (info: Partial<FuneralInfo>): boolean => {
  const requiredFields = [
    'funeralDescription',
    'durationMin',
    'shroudDescription',
    'shroudPrice',
    'funeralImage',
    'shroudImage',
  ];

  return requiredFields.some(
    field =>
      info[field] !== null &&
      info[field] !== undefined &&
      info[field] !== '' &&
      (field !== 'durationMin' || (info[field] as number) > 0) &&
      (field !== 'shroudPrice' || (info[field] as number) > 0),
  );
};
