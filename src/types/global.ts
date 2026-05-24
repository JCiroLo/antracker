export type EnviromentVariables = {
  APP_ENV: "development" | "production";
  APP_URL: string;
  API_URL: string;
  MAINTENANCE_MODE: boolean;
  TRANSACTIONS_LIMIT: number;
};

export type Dialog = "manage-transaction-template" | "remove-transaction-template" | "global-settings";

export type AccentColor = "ant" | "lime" | "dragonfruit" | "lavender" | "mintice";

export type RouteScope = "REQUIRES_AUTH" | "HIDE_FOR_AUTH";

export type User = {
  consent_date: string;
  created_at: string;
  data_processing_consent: boolean;
  email: string;
  id: string;
  privacy_policy_accepted: boolean;
  terms_and_conditions_accepted: boolean;
};

export type DateRangeKey = "this-month" | "last-7-days" | "last-30-days" | "last-90-days" | "last-5-years" | "custom";

export type DateRange = {
  label: string;
  date: string;
  enabled: boolean;
};
