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

interface CompanyBookingInfo {
  // companyBookingInfo: {
  bookingInfo: {
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

    bookingHistory: {
      bookingDate: string;
      packageName: string;
      totalFee: number;
      bookingStatus: string;
    }[];
  };
  petInfo: {
    type: string;
    name: string;
    weight: string;
    age: string;
  };
  // };
}

export type GetReservationOutputDTO = OutputDTO<Reservation[]>;
export type GetReservationDetailOutputDTO = OutputDTO<CompanyBookingInfo>;
