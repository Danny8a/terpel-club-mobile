export type DocumentType = 'CC' | 'CE' | 'PA';

export interface LoginFormData {
  documentType: DocumentType;
  documentNumber: string;
}