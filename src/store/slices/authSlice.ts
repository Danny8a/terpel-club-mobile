import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {DocumentType, AuthState} from '../../../types/auth.types';

const initialState: AuthState = {
  isLoggedIn: false,
  documentType: 'CC',
  documentNumber: '',
  documentEncoded: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        documentType: DocumentType;
        documentNumber: string;
        documentEncoded: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.documentType = action.payload.documentType;
      state.documentNumber = action.payload.documentNumber;
      state.documentEncoded = action.payload.documentEncoded;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.documentType = 'CC';
      state.documentNumber = '';
      state.documentEncoded = '';
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
