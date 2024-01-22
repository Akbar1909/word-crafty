import {create} from 'zustand';
import {authMMKVStorage} from './mmkv/store';

export interface UseAuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (
    accessToken: UseAuthStoreState['accessToken'],
    refreshToken: UseAuthStoreState['refreshToken'],
  ) => void;
}

const useAuthStore = create<UseAuthStoreState>()(set => ({
  accessToken: authMMKVStorage.getString('access_token') || null,
  refreshToken: authMMKVStorage.getString('refresh_token') || null,
  setTokens: (accessToken: string | null, refreshToken: string | null) =>
    set(state => ({...state, accessToken, refreshToken})),
}));

export default useAuthStore;
