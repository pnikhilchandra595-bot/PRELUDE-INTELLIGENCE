import React, { createContext, useContext, useState, useEffect } from 'react';
import { ErrorCode } from '../types/api';
import { clientConfig, updateClientConfig } from '../api/client';

interface DemoContextType {
  forcedError: ErrorCode | null;
  setForcedError: (error: ErrorCode | null) => void;
  latency: number;
  setLatency: (ms: number) => void;
  isMock: boolean;
  setIsMock: (mock: boolean) => void;
  liveBaseUrl: string;
  setLiveBaseUrl: (url: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forcedError, setForcedErrorState] = useState<ErrorCode | null>(clientConfig.forcedErrorCode);
  const [latency, setLatencyState] = useState<number>(clientConfig.simulatedDelayMs);
  const [isMock, setIsMockState] = useState<boolean>(clientConfig.useMock);
  const [liveBaseUrl, setLiveBaseUrlState] = useState<string>(clientConfig.baseUrl);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setForcedError = (error: ErrorCode | null) => {
    setForcedErrorState(error);
    updateClientConfig({ forcedErrorCode: error });
  };

  const setLatency = (ms: number) => {
    setLatencyState(ms);
    updateClientConfig({ simulatedDelayMs: ms });
  };

  const setIsMock = (mock: boolean) => {
    setIsMockState(mock);
    updateClientConfig({ useMock: mock });
  };

  const setLiveBaseUrl = (url: string) => {
    setLiveBaseUrlState(url);
    updateClientConfig({ baseUrl: url });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DemoContext.Provider
      value={{
        forcedError,
        setForcedError,
        latency,
        setLatency,
        isMock,
        setIsMock,
        liveBaseUrl,
        setLiveBaseUrl,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
