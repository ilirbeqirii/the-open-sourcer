import { createContext, useCallback, useEffect, useMemo } from "react";
import { User, UserResponse } from "../api/models/user";
import { AuthModel } from "../api/models/login";
import { RegisterModel } from "../api/models/register";
import * as authService from "../data-access/auth-service";
import { useAsync } from "../hooks/use-async";
import FullPageSpinner from "../components/lib/FullPageSpinner";
import { FullPageError } from "../components/lib/FullPageError";

type AuthContextState = {
  user: User | undefined;
  login: (authInfo: AuthModel) => Promise<void>;
  register: (registerInfo: RegisterModel) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);
AuthContext.displayName = "AuthContext";

async function getAuthenticatedUser() {
  let user: User | undefined;

  const token = await authService.getToken();
  if (token) {
    const response: UserResponse = await authService.getUser(token);
    user = response.user;
  }

  return user;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    data: user,
    isError,
    isLoading,
    error,
    run,
    setData,
    isSuccess,
    isIdle,
  } = useAsync<User | undefined>();

  useEffect(() => {
    const userPromise = getAuthenticatedUser();
    run(userPromise);
  }, [run]);

  const register = useCallback(
    (registerInfo: RegisterModel) =>
      authService
        .register(registerInfo)
        .then((registeredUser) => setData(registeredUser)),
    [setData]
  );

  const login = useCallback(
    (authInfo: AuthModel) =>
      authService.login(authInfo).then((user) => setData(user)),
    [setData]
  );

  const logout = useCallback(() => {
    return authService.logout().then(() => {
      setData(undefined);
    });
  }, [setData]);

  const contextValue = useMemo(
    () => ({ user, login, register, logout }),
    [login, logout, register, user]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError && error) {
    return <FullPageError error={error} />;
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };
