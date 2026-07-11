import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    setSession(authService.restoreSession());
    setIsRestoring(false);
  }, []);

  const login = useCallback((credentials) => {
    const nextSession = authService.login(credentials);
    setSession(nextSession);
    return nextSession;
  }, []);

  const signup = useCallback((details) => {
    const nextSession = authService.signup(details);
    setSession(nextSession);
    return nextSession;
  }, []);

  const continueAsGuest = useCallback(() => {
    const nextSession = authService.continueAsGuest();
    setSession(nextSession);
    return nextSession;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      continueAsGuest,
      isRestoring,
      login,
      logout,
      session,
      signup,
    }),
    [continueAsGuest, isRestoring, login, logout, session, signup],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
