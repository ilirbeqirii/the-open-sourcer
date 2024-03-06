import { Suspense, lazy } from "react";
import FullPageSpinner from "./components/lib/FullPageSpinner";
import { useAuth } from "./hooks/use-auth";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageError } from "./components/lib/FullPageError";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
