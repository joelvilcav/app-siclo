export interface PaymentTable {
  summary: Summary;
  data: Payment[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Payment {
  operationId: number;
  month: number;
  day: number;
  week: number;
  purchaseDate: string;
  accreditationDate: string;
  releaseDate: string;
  operationType: string;
  productValue: number;
  transactionFee: number;
  amountReceived: number;
  installments: number;
  paymentMethod: string;
  packageName: string;
  classCount: number;
  clientInfo: ClientInfo;
}

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
}

export interface OperationSummary {
  approved: number;
}

export interface Summary {
  operationSummary: OperationSummary;
  totalAmountReceived: number;
}