
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import React from 'react';

interface MusicVisibilityContextType {
  isHidden: boolean;
  hide: () => void;
  show: () => void;
}

const MusicVisibilityContext = createContext<MusicVisibilityContextType>({
  isHidden: false,
  hide: () => {},
  show: () => {},
});

export function MusicVisibilityProvider({ children }: { children: ReactNode }) {
  const [isHidden, setIsHidden] = useState(false);

  const hide = useCallback(() => setIsHidden(true), []);
  const show = useCallback(() => setIsHidden(false), []);

  return React.createElement(
    MusicVisibilityContext.Provider,
    { value: { isHidden, hide, show } },
    children
  );
}

export function useMusicVisibility() {
  return useContext(MusicVisibilityContext);
}
