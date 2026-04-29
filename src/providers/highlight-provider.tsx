import React from "react";

type HighlightContextType = {
  id: string | null;
  setId: (newId: string, timeout?: number) => void;
};

type HighlightProviderProps = {
  children: React.ReactNode;
};

const HighlightContext = React.createContext<HighlightContextType>(null!);

const HighlightProvider: React.FC<HighlightProviderProps> = ({ children }) => {
  const [id, setId] = React.useState<string | null>(null);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  const setHighlightId = (newId: string, timeout: number = 3000) => {
    setId(newId);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setId(null);
    }, timeout);

    setTimeoutId(newTimeoutId);
  };

  return <HighlightContext.Provider value={{ id, setId: setHighlightId }}>{children}</HighlightContext.Provider>;
};

export { HighlightContext };
export default HighlightProvider;
