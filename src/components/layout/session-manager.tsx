import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import useSessionStore from "@/stores/use-session-store";
import Logger from "@/lib/logger";
import { auth } from "@/lib/firebase";
import xior from "@/lib/xior";

type SessionManagerProps = {
  children: React.ReactNode;
};

const SessionManager: React.FC<SessionManagerProps> = ({ children }) => {
  const { setUser, setIsLoading } = useSessionStore();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      Logger.log("user changed", firebaseUser);

      if (!firebaseUser) {
        setIsLoading(false);
        return;
      }

      const token = await firebaseUser.getIdToken();

      xior.interceptors.request.use(
        (config) => {
          config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

          return config;
        },
        (error) => Promise.reject(error),
      );

      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setIsLoading]);

  return children;
};

export default SessionManager;
