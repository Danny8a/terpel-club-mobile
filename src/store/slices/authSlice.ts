import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type DocumentType = 'CC' | 'CE' | 'PA';

type AuthState = {
  isLoggedIn: boolean;
  documentType: DocumentType;
  documentNumber: string;
};

const initialState: AuthState = {
  isLoggedIn: false,
  documentType: 'CC',
  documentNumber: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{documentType: DocumentType; documentNumber: string}>,
    ) => {
      state.isLoggedIn = true;
      state.documentType = action.payload.documentType;
      state.documentNumber = action.payload.documentNumber;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.documentNumber = '';
      state.documentType = 'CC';
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
