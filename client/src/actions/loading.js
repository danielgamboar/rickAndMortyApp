import { IS_LOADING } from './types';

export const setLoading = (value) => ({
  type: IS_LOADING,
  payload: value,
});
