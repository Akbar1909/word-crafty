/* eslint-disable @typescript-eslint/no-shadow */
import React, {createContext, FC, useContext, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore, {UseAuthStoreState} from '../store/authStore';

interface AuthContextState {
  hasValidToken: boolean;
  saveTokenToStorage: ({
    accessToken,
  }: Pick<UseAuthStoreState, 'accessToken'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextState>({
  hasValidToken: false,
  saveTokenToStorage: '' as any,
});

const AuthProvider: FC<{children: any}> = ({children}) => {
  const {accessToken, setTokens} = useAuthStore();

  const saveTokenToStorage = async ({
    accessToken,
  }: Pick<UseAuthStoreState, 'accessToken'>) => {
    try {
      await AsyncStorage.setItem('access_token', accessToken || '');
      setTokens(accessToken, '');
    } catch (e: any) {
      console.log(e);
    }
  };

  console.log({accessToken});

  const value: AuthContextState = useMemo(
    () => ({
      saveTokenToStorage,
      hasValidToken: Boolean(accessToken),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken],
  );

  // useEffect(() => {
  //   (async () => {
  //     const accessToken = await AsyncStorage.getItem('access_token');

  //     setTokens(accessToken, '');
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
