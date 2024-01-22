import {MMKV} from 'react-native-mmkv';
import {MMKV_PREFIX} from './prefix';

export const wordListsMMKVStorage = new MMKV({
  id: `${MMKV_PREFIX}-word-lists`,
});

export const authMMKVStorage = new MMKV({
  id: `${MMKV_PREFIX}-auth`,
});
