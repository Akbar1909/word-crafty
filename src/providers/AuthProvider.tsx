/* eslint-disable @typescript-eslint/no-shadow */
import React, {createContext, FC, useContext, useEffect, useMemo} from 'react';
import useAuthStore, {UseAuthStoreState} from '../store/authStore';
import {authMMKVStorage} from '../store/mmkv/store';

interface AuthContextState {
  hasValidToken: boolean;
  saveTokenToStorage: ({
    accessToken,
  }: Pick<UseAuthStoreState, 'accessToken'>) => void;
}

const AuthContext = createContext<AuthContextState>({
  hasValidToken: false,
  saveTokenToStorage: '' as any,
});

const AuthProvider: FC<{children: any}> = ({children}) => {
  const {accessToken, setTokens} = useAuthStore();

  const saveTokenToStorage = ({
    accessToken,
  }: Pick<UseAuthStoreState, 'accessToken'>) => {
    try {
      authMMKVStorage.set('access_token', accessToken || '');
      setTokens(accessToken, '');
    } catch (e: any) {}
  };

  const value: AuthContextState = useMemo(
    () => ({
      saveTokenToStorage,
      hasValidToken: Boolean(accessToken),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
