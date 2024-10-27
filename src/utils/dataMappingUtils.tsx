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
export const isCompanyInfoComplete = (info: Partial<CompanyInfo>): boolean => {
  // 필수 필드들이 모두 존재하고 유효한 값을 가지고 있는지 확인
  const requiredFields = [
    'companyName',
    'contact',
    'postalCode',
    'address',
    'addressDetail',
    'offDay',
    'weekdayOpen',
    'weekdayClose',
    'weekendOpen',
    'weekendClose',
    'parallel',
    'notification',
    'logoImage',
  ];

  return requiredFields.every(field => {
    const value = info[field];

    // 특별한 검증이 필요한 필드들
    if (field === 'offDay') {
      return Array.isArray(value) && value.length > 0;
    }
    if (field === 'parallel') {
      return typeof value === 'number' && value > 0;
    }
    if (field === 'logoImage') {
      return value !== null && value !== undefined;
    }

    // 문자열 필드들에 대한 기본 검증
    return value !== null && value !== undefined && value !== '';
  });
};

// 장례 정보에 대한 완전성 검사 함수
export const isFuneralInfoComplete = (info: Partial<FuneralInfo>): boolean => {
  // 필수 필드들이 모두 존재하고 유효한 값을 가지고 있는지 확인
  const requiredFields = [
    'funeralDescription',
    'durationMin',
    'shroudDescription',
    'shroudPrice',
    'hasMemorial',
    'memorialPrice',
    'funeralImage',
    'shroudImage',
    'memorialImages',
  ];

  return requiredFields.every(field => {
    const value = info[field];

    // 특별한 검증이 필요한 필드들
    if (
      field === 'durationMin' ||
      field === 'shroudPrice' ||
      field === 'memorialPrice'
    ) {
      return typeof value === 'number' && value > 0;
    }
    if (field === 'hasMemorial') {
      return typeof value === 'boolean';
    }
    if (field === 'funeralImage' || field === 'shroudImage') {
      return value !== null && value !== undefined;
    }
    if (field === 'memorialImages') {
      return Array.isArray(value);
    }

    // 문자열 필드들에 대한 기본 검증
    return value !== null && value !== undefined && value !== '';
  });
};
