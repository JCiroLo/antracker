export type FrequencyUnit = "days" | "weeks" | "months" | "years";

export type TransactionType = "expense" | "income";

export type TransactionTemplate = {
  amount: number;
  category_id: string | null;
  created_at: string;
  frequency_unit: FrequencyUnit | null;
  frequency_value: number | null;
  id: string;
  is_single_payment: boolean;
  start_date: string | null;
  title: string;
  type: TransactionType;
  user_id: string;
};

export type TransactionRecord = {
  amount: number;
  category_id: string | null;
  created_at: string;
  id: string;
  paid_date: string;
  template_id: string;
  times: number;
  title: string;
  user_id: string;
};

export type TransactionSummary = {
  current_period_end: string;
  current_period_start: string;
  is_expiring_soon: boolean;
  is_overdue: boolean;
  is_paid: boolean;
  record: TransactionRecord | null;
  template: TransactionTemplate;
};

export type Transaction = TransactionRecord & {
  template: TransactionTemplate;
};

export type NewTransactionTemplate = Omit<TransactionTemplate, "id" | "created_at">;

export type UpdateTransactionTemplate = Partial<Omit<TransactionTemplate, "id" | "user_id">>;

export type NewTransactionRecord = Omit<TransactionRecord, "id" | "created_at">;

export type UpdateTransactionRecord = Partial<Omit<TransactionRecord, "id" | "user_id">>;
