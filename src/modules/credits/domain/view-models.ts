export interface CreditStatementEntryViewModel {
  id: number;
  delta: number;
  balanceAfter: number;
  reason: string;
  referenceType: string;
  referenceId: number | null;
  createdAt: string | null;
}

export interface CreditEventViewModel {
  ledgerId: number | null;
  type: string;
  operation: string;
  delta: number;
  balanceAfter: number | null;
  reason: string;
  referenceType: string;
  referenceId: number | null;
  createdAt: string | null;
}

export interface CreditVideoGenerationViewModel {
  inputId: number;
  title: string | null;
  status: string;
  presetId: number | null;
  presetName: string | null;
  predictionId: number | null;
  predictionStatus: string | null;
  predictionErrorCode: string | null;
  predictionErrorMessage: string | null;
  outputVideoUrl: string | null;
  creditsDebited: number;
  creditsRefunded: number;
  creditsUsed: number;
  isFailed: boolean;
  isCanceled: boolean;
  isRefunded: boolean;
  failureCode: string | null;
  failureMessage: string | null;
  failureReason: string | null;
  cancellationReason: string | null;
  creditEvents: CreditEventViewModel[];
  createdAt: string | null;
  updatedAt: string | null;
}
