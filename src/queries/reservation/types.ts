export interface OutputDTO<T = any> {
  statusCode: string;
  msg: string;
  data: T;
}

export interface GetReservationInputDTO {
  startDate: string;
  endDate: string;
}

interface Reservation {
  bookingId: string;
  bookingStatus: string;
  bookingDate: string;
  petName: string;
  petType: string;
  funeralStartDate: string;
  funeralEndDate: string;
  selectedFuneralId: string;
  packageName: string;
}

export interface CompanyBookingInfo {
  // companyBookingInfo: {
  bookingInfo: {
    bookingId: string;
    bookingDate: string;
    paymentDate: string;
    packageName: string;
    bookingStatus: string;
    totalFee: number;
    memo: string;
  };
  userInfo: {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    addressDetail: string;

    bookingHistory: {
      bookingDate: string;
      packageName: string;
      bookingStatus: string;
      totalFee: number;
    }[];
  };
  petInfo: {
    majorType: string;
    minorType: string;
    name: string;
    gender: string;
    weight: string;
    age: string;
  };
  // };
}

export interface CreateReservation {
  packageName: string;
  /**
   * ISODateString + 9시간
   */
  bookingDate: string;
  bookingStart?: string;
  bookingEnd?: string;
  guardianInfo: {
    name: string;
    phoneNumber: string;
    postalCode: string;
    address: string;
    addressDetail?: string;
  };
  petInfo: {
    majorType: string;
    minorType: string;
    name: string;
    gender?: '수컷' | '암컷';
    weight: string;
    /**
     * 3y10m 형태
     */
    age: string;
  };
  memo: string;
}

interface FuneralInfo {
  funeralId: string;
  funeralType: string;
  totalFee: number;
}

export type GetReservationOutputDTO = OutputDTO<Reservation[]>;
export type GetAvailableHoursOutputDTO = OutputDTO<boolean[]>;
export type GetReservationDetailOutputDTO = OutputDTO<CompanyBookingInfo>;
export type PutChangeBookingStatusOutputDTO = OutputDTO<{
  bookingId: string;
  parallelBookingCount: number;
}>;
export type PostChangeBookingMemoOutputDTO = OutputDTO;
export type GetFuneralOptionsOutputDTO = OutputDTO<FuneralInfo[]>;
