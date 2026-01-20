import {configureStore} from '@reduxjs/toolkit';
import authReducer, {login, logout} from '../../src/store/slices/authSlice';
import type {DocumentType} from '../../src/types/auth.types';

describe('Redux Store Integration', () => {
  it('should create a store with initial state', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    const state = store.getState();

    expect(state.auth.isLoggedIn).toBe(false);
    expect(state.auth.documentType).toBe('CC');
    expect(state.auth.documentNumber).toBe('');
  });

  it('should dispatch login action correctly', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    const payload = {
      documentType: 'CE' as DocumentType,
      documentNumber: '1234567',
    };

    store.dispatch(login(payload));
    const state = store.getState();

    expect(state.auth.isLoggedIn).toBe(true);
    expect(state.auth.documentType).toBe('CE');
    expect(state.auth.documentNumber).toBe('1234567');
  });

  it('should dispatch logout action correctly', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    // First login
    store.dispatch(login({
      documentType: 'CC',
      documentNumber: '1111111',
    }));

    // Then logout
    store.dispatch(logout());
    const state = store.getState();

    expect(state.auth.isLoggedIn).toBe(false);
    expect(state.auth.documentNumber).toBe('');
    expect(state.auth.documentType).toBe('CC');
  });

  it('should maintain auth state and reset on logout', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    // Initial state
    let state = store.getState();
    expect(state.auth.isLoggedIn).toBe(false);

    // Login
    store.dispatch(login({
      documentType: 'PA',
      documentNumber: '9876543',
    }));

    state = store.getState();
    expect(state.auth.isLoggedIn).toBe(true);
    expect(state.auth.documentType).toBe('PA');

    // Logout - should reset to initial values
    store.dispatch(logout());
    state = store.getState();
    expect(state.auth.isLoggedIn).toBe(false);
    expect(state.auth.documentType).toBe('CC');
    expect(state.auth.documentNumber).toBe('');
  });
});
