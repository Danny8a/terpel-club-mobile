export type DocumentType = 'CC' | 'CE' | 'PA';

export type AuthState = {
  isAuthenticated: boolean;
  documentType: DocumentType | null;
  documentNumber: string | null;
  documentEncoded?: string | null;
};
