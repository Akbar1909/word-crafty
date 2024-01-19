import {create} from 'zustand';

export interface UseAuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (
    accessToken: UseAuthStoreState['accessToken'],
    refreshToken: UseAuthStoreState['refreshToken'],
  ) => void;
}

const useAuthStore = create<UseAuthStoreState>()(set => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (accessToken: string | null, refreshToken: string | null) =>
    set(state => ({...state, accessToken, refreshToken})),
}));

export default useAuthStore;
