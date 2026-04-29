import Env from "./env";

const Logger = {
  log(...messages: unknown[]) {
    if (Env.APP_ENV !== "development") {
      return;
    }

    console.log("[Antracker]", ...messages);
  },
  analytics(...messages: unknown[]) {
    if (Env.APP_ENV !== "development") {
      return;
    }

    console.log("[Analytics]", ...messages);
  },
};

export default Logger;
