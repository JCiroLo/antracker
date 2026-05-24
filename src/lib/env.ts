import type { EnviromentVariables } from "@/types/global";

const Env: EnviromentVariables = {
  APP_ENV: import.meta.env.VITE_APP_ENV,
  APP_URL: import.meta.env.VITE_APP_URL,
  API_URL: import.meta.env.VITE_API_URL,
  MAINTENANCE_MODE: import.meta.env.VITE_MAINTENANCE_MODE === "true",
  TRANSACTIONS_LIMIT: Number(import.meta.env.VITE_TRANSACTIONS_LIMIT || 0),
};

export default Env;
