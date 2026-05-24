export type Analytics = {
  balance_accumulative: BalanceAccumulative[];
  expense_distribution: ExpenseDistribution[];
  financial_stress: FinancialStress[];
  income_distribution: IncomeDistribution[];
  range: Range;
  totals: Totals;
};

export type BalanceAccumulative = {
  balance: number;
  date: string;
  expense: number;
  income: number;
};

export type ExpenseDistribution = {
  category: string;
  total: number;
};

export type FinancialStress = {
  date: string;
  expense: number;
};

export type IncomeDistribution = {
  category: string;
  total: number;
};

export type Range = {
  end: string;
  start: string;
};

export type Totals = {
  balance: number;
  expenses: number;
  income: number;
};
