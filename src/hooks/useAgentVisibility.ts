
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import React from 'react';

interface AgentVisibilityContextType {
  isHidden: boolean;
  hide: () => void;
  show: () => void;
}

const AgentVisibilityContext = createContext<AgentVisibilityContextType>({
  isHidden: false,
  hide: () => {},
  show: () => {},
});

export function AgentVisibilityProvider({ children }: { children: ReactNode }) {
  const [isHidden, setIsHidden] = useState(false);

  const hide = useCallback(() => setIsHidden(true), []);
  const show = useCallback(() => setIsHidden(false), []);

  // Apply visibility to the Readdy Agent widget button
  useEffect(() => {
    const applyVisibility = () => {
      const widgetButton = document.querySelector('#vapi-widget-floating-button') as HTMLElement;
      const widgetContainer = document.querySelector('[data-readdy-widget]') as HTMLElement;
      
      if (widgetButton) {
        widgetButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        widgetButton.style.opacity = isHidden ? '0' : '1';
        widgetButton.style.pointerEvents = isHidden ? 'none' : 'auto';
        widgetButton.style.transform = isHidden ? 'scale(0.8)' : 'scale(1)';
      }
      
      if (widgetContainer) {
        widgetContainer.style.transition = 'opacity 0.3s ease';
        widgetContainer.style.opacity = isHidden ? '0' : '1';
        widgetContainer.style.pointerEvents = isHidden ? 'none' : 'auto';
      }
    };

    // Apply immediately
    applyVisibility();

    // Also apply after a short delay to catch dynamically loaded widget
    const timeoutId = setTimeout(applyVisibility, 500);
    const intervalId = setInterval(applyVisibility, 1000);

    // Clean up after 5 seconds
    const cleanupId = setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearTimeout(cleanupId);
    };
  }, [isHidden]);

  return React.createElement(
    AgentVisibilityContext.Provider,
    { value: { isHidden, hide, show } },
    children
  );
}

export function useAgentVisibility() {
  return useContext(AgentVisibilityContext);
}
