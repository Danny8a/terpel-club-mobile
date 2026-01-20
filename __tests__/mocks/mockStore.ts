import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../../src/store/slices/authSlice';

/**
 * Creates a test store for use in tests
 */
export const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['auth/login'],
          ignoredPaths: ['auth.lastLoginTime'],
        },
      }),
  });
};

export type TestStore = ReturnType<typeof createTestStore>;
