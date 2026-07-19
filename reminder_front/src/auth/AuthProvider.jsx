import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const restore = async () => {
      try {
        const restoredSession = await authService.restoreSession();

        if (isCurrent) {
          setSession(restoredSession);
          setAuthError("");
        }
      } catch (error) {
        if (isCurrent) {
          setAuthError(error.message);
        }
      } finally {
        if (isCurrent) {
          setIsRestoring(false);
        }
      }
    };

    const unsubscribe = authService.onAuthStateChange((nextSession) => {
      setSession((currentSession) => {
        if (currentSession?.mode === "guest") {
          return currentSession;
        }

        return nextSession;
      });
    });

    restore();

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, []);

  const runAuthAction = useCallback(async (action) => {
    setIsAuthSubmitting(true);
    setAuthError("");
    setAuthMessage("");

    try {
      const result = await action();

      if (result?.pendingEmailConfirmation) {
        setAuthMessage(result.message);
        return result;
      }

      setSession(result);
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthSubmitting(false);
    }
  }, []);

  const login = useCallback((credentials) => runAuthAction(() => authService.login(credentials)), [runAuthAction]);

  const signup = useCallback((details) => runAuthAction(() => authService.signup(details)), [runAuthAction]);

  const continueAsGuest = useCallback(
    () => runAuthAction(() => Promise.resolve(authService.continueAsGuest())),
    [runAuthAction],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!session) {
      return;
    }

    await authService.deleteAccount();
    setSession(null);
  }, [session]);

  const clearAuthError = useCallback(() => {
    setAuthError("");
    setAuthMessage("");
  }, []);

  const value = useMemo(
    () => ({
      authError,
      authMessage,
      clearAuthError,
      continueAsGuest,
      deleteAccount,
      isAuthSubmitting,
      isRestoring,
      login,
      logout,
      session,
      signup,
    }),
    [
      authError,
      authMessage,
      clearAuthError,
      continueAsGuest,
      deleteAccount,
      isAuthSubmitting,
      isRestoring,
      login,
      logout,
      session,
      signup,
    ],
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
