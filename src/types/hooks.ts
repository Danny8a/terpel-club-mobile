import type {ApiError} from './api';

export type UseApiCallState<T> = {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
};
