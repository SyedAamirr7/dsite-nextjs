'use client';

import { createContext, useContext, ReactNode } from 'react';

export interface AcpLayoutContextValue {
  layoutProvided: boolean;
}

const AcpLayoutContext = createContext<AcpLayoutContextValue>({ layoutProvided: false });

export function AcpLayoutProvider({ children, value }: { children: ReactNode; value: AcpLayoutContextValue }) {
  return (
    <AcpLayoutContext.Provider value={value}>
      {children}
    </AcpLayoutContext.Provider>
  );
}

export function useAcpLayout(): AcpLayoutContextValue {
  return useContext(AcpLayoutContext);
}
