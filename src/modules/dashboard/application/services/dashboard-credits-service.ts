import { getCreditsBalance, getCreditsStatement, getCreditsVideoGenerations } from '@/lib/api/dashboard';
import { mapCreditStatementToViewModel, mapCreditVideoGenerationToViewModel } from '@/modules/credits/application/mappers';
import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';

export interface DashboardCreditsSnapshot {
  creditBalance: number;
  creditStatement: CreditStatementEntryViewModel[];
  creditVideoGenerations: CreditVideoGenerationViewModel[];
}

export const fetchDashboardCredits = async (token: string, page = 1, perPage = 100): Promise<DashboardCreditsSnapshot> => {
  const [balance, statement, videoGenerations] = await Promise.all([
    getCreditsBalance(token),
    getCreditsStatement(token, page, perPage).then((response) => response.data),
    getCreditsVideoGenerations(token, page, perPage).then((response) => response.data),
  ]);

  return {
    creditBalance: balance.credit_balance,
    creditStatement: statement.map(mapCreditStatementToViewModel),
    creditVideoGenerations: videoGenerations.map(mapCreditVideoGenerationToViewModel),
  };
};
