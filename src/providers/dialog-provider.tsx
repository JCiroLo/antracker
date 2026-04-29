import React from "react";
import type { Dialog } from "@/types/global";

type DialogContextType = {
  queue: Record<Dialog, { open: boolean; data?: unknown }>;
  open: <T>(id: Dialog, data?: T) => void;
  isOpen: (id: Dialog) => boolean;
  close: (id: Dialog) => void;
  clear: () => void;
  getData: <T>(id: Dialog) => T | undefined;
};

type DialogProviderProps = {
  children: React.ReactNode;
};

const DialogContext = React.createContext<DialogContextType>(null!);

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [queue, setQueue] = React.useState({} as Record<Dialog, { open: boolean; data?: unknown }>);

  const open = <T,>(id: Dialog, data?: T) => setQueue((prev) => ({ ...prev, [id]: { open: true, data } }));

  const isOpen = (id: Dialog) => Boolean(queue[id]?.open);

  const close = (id: Dialog) => {
    setQueue((prev) => {
      const newQueue = { ...prev };
      delete newQueue[id];
      return newQueue;
    });
  };

  const clear = () => setQueue({} as Record<Dialog, { open: boolean; data?: unknown }>);

  const getData = <T,>(id: Dialog) => queue[id]?.data as T | undefined;

  return <DialogContext.Provider value={{ queue, open, isOpen, close, clear, getData }}>{children}</DialogContext.Provider>;
};

export { DialogContext };
export default DialogProvider;
