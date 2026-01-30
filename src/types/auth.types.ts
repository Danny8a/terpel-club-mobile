export type DocumentType = 'CC' | 'CE' | 'PA';

export type AuthState = {
  isLoggedIn: boolean;
  documentType: DocumentType;
  documentNumber: string;
  documentEncoded: string;
};
