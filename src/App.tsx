import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SpaceMusic from "./components/feature/SpaceMusic";
import MobileNav from "./components/feature/MobileNav";
import { ThemeProvider } from "./components/feature/ThemeToggle";
import { MusicVisibilityProvider, useMusicVisibility } from "./hooks/useMusicVisibility";
import { AgentVisibilityProvider } from "./hooks/useAgentVisibility";

/* -----------------------------------------------------------------------
   CSS that was previously embedded directly inside the JSX.
   Keeping it as a constant and injecting it via `dangerouslySetInnerHTML`
   avoids JSX parsing errors.
----------------------------------------------------------------------- */
const themeStyles = `
  :root {
    --bg-primary: #020617;
    --bg-secondary: #0f172a;
    --bg-tertiary: #1e293b;
  }
  [data-theme="light"] {
    --bg-primary: #e0f2fe;
    --bg-secondary: #f0f9ff;
    --bg-tertiary: #e7f5ff;
  }
  .theme-bg-primary {
    background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary));
  }
  .theme-bg-nav {
    background-color: color-mix(in srgb, var(--bg-primary) 80%, transparent);
  }
  .theme-bg-card {
    background-color: color-mix(in srgb, var(--bg-secondary) 60%, transparent);
  }
  .theme-bg-footer {
    background-color: color-mix(in srgb, var(--bg-primary) 80%, transparent);
  }
`;

/* -----------------------------------------------------------------------
   Simple error boundary to keep the UI stable if something unexpected
   occurs while rendering the app.
----------------------------------------------------------------------- */
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You could log the error to an external service here
    console.error("AppErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1>Something went wrong.</h1>
          <p>Please try reloading the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

/* -----------------------------------------------------------------------
   Music Player Wrapper - Uses visibility context
----------------------------------------------------------------------- */
function MusicPlayerWrapper() {
  const { isHidden } = useMusicVisibility();
  return <SpaceMusic hidden={isHidden} />;
}

/* -----------------------------------------------------------------------
   Main App component
----------------------------------------------------------------------- */
function App() {
  return (
    <AppErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <MusicVisibilityProvider>
            <AgentVisibilityProvider>
              <BrowserRouter basename={__BASE_PATH__}>
                {/* Global Mobile Navigation - Always visible on mobile */}
                <MobileNav />
                {/* Global Music Player - Bottom left */}
                <MusicPlayerWrapper />
                <AppRoutes />
              </BrowserRouter>
            </AgentVisibilityProvider>
          </MusicVisibilityProvider>

          {/* Inject the CSS */}
          <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        </ThemeProvider>
      </I18nextProvider>
    </AppErrorBoundary>
  );
}

export default App;
