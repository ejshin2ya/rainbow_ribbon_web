import { CompanyInfo } from '../services/companyService';
import { RegistrationData } from '../atoms/registrationDataState';
import { FuneralInfo } from '../services/FuneralCompositionService';
import {
  FuneralCompositionState,
  MemorialImage,
} from '../atoms/funeralCompositionState';

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
): FuneralCompositionState => {
  // memorialImages를 MemorialImage 타입으로 변환
  const convertToMemorialImage = (
    images: (string | File)[],
  ): MemorialImage[] => {
    return images.map(image => {
      if (image instanceof File) {
        return {
          file: image,
          preview: URL.createObjectURL(image),
        };
      } else {
        // string인 경우 (이미 업로드된 이미지 URL)
        return {
          file: new File([], 'placeholder'), // 또는 적절한 File 객체 생성
          preview: image,
        };
      }
    });
  };

  return {
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
    memorialImage: convertToMemorialImage(funeralInfo.memorialImages ?? []),
  };
};

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

// 회사 정보에 대한 완전성 검사 함수
export const isCompanyInfoComplete = (
  info: Partial<RegistrationData>,
): boolean => {
  if (!info?.companyInfoEditReq) {
    return false;
  }

  const {
    companyName,
    contact,
    postalCode,
    address,
    addressDetail,
    offDay,
    weekdayOpen,
    weekdayClose,
    weekendOpen,
    weekendClose,
    parallel,
    notification,
  } = info.companyInfoEditReq;

  const checks = {
    companyName: !!companyName,
    contact: !!contact,
    postalCode: !!postalCode,
    address: !!address,
    addressDetail: !!addressDetail,
    offDay: Array.isArray(offDay) && offDay.length > 0,
    weekdayOpen: !!weekdayOpen,
    weekdayClose: !!weekdayClose,
    weekendOpen: !!weekendOpen,
    weekendClose: !!weekendClose,
    parallel: !!parallel && parallel > 0,
    notification: !!notification,
    logoImage: !!info.logoImage,
  };

  return Object.values(checks).every(Boolean);
};

// 장례 정보에 대한 완전성 검사 함수
export const isFuneralInfoComplete = (
  info: Partial<FuneralCompositionState>,
): boolean => {
  if (!info?.funeralInfoUpdateReq) {
    return false;
  }

  const {
    funeralDescription,
    durationMin,
    shroudDescription,
    shroudPrice,
    hasMemorial,
    memorialPrice,
  } = info.funeralInfoUpdateReq;

  // 기본 체크 항목 (hasMemorial 상태와 관계없이 항상 체크)
  const basicChecks = {
    funeralDescription: !!funeralDescription,
    durationMin: !!durationMin && durationMin > 0,
    shroudDescription: !!shroudDescription,
    shroudPrice: !!shroudPrice && shroudPrice > 0,
    hasMemorial: hasMemorial !== undefined,
    funeralImage: !!info.funeralImage,
    shroudCoffinImage: !!info.shroudCoffinImage,
  };

  // hasMemorial이 true일 때만 추가 체크
  const memorialChecks = hasMemorial
    ? {
        memorialPrice: !!memorialPrice && memorialPrice > 0,
        memorialImage:
          Array.isArray(info.memorialImage) && info.memorialImage.length > 0,
      }
    : {};

  const allChecks = { ...basicChecks, ...memorialChecks };

  return Object.values(allChecks).every(Boolean);
};
