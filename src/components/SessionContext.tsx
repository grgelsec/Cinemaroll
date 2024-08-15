import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionContextType {
  sessionId: string | null;
  signIn: (newSessionId: string) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = sessionStorage.getItem("sessionID");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  const signIn = (newSessionId: string): void => {
    sessionStorage.setItem("sessionID", newSessionId);
    setSessionId(newSessionId);
  };

  const signOut = (): void => {
    sessionStorage.removeItem("sessionID");
    setSessionId(null);
  };

  return (
    <SessionContext.Provider value={{ sessionId, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
