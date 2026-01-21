import authReducer, {login, logout} from '../../src/store/slices/authSlice';
import type {DocumentType} from '../../src/types/auth.types';

describe('authSlice', () => {
  it('should return the initial state', () => {
    const state = authReducer(undefined, {type: ''});
    
    expect(state).toEqual({
      isLoggedIn: false,
      documentType: 'CC',
      documentNumber: '',
      documentEncoded: '',
    });
  });

  describe('login action', () => {
    it('should set isLoggedIn to true with valid credentials', () => {
      const payload = {
        documentType: 'CE' as DocumentType,
        documentNumber: '1234567',
      };

      const state = authReducer(undefined, login(payload));

      expect(state.isLoggedIn).toBe(true);
      expect(state.documentType).toBe('CE');
      expect(state.documentNumber).toBe('1234567');
    });

    it('should update document type correctly', () => {
      const payload = {
        documentType: 'PA' as DocumentType,
        documentNumber: '9876543',
      };

      const state = authReducer(undefined, login(payload));

      expect(state.documentType).toBe('PA');
    });

    it('should handle all document types', () => {
      const documentTypes: DocumentType[] = ['CC', 'CE', 'PA'];

      documentTypes.forEach(docType => {
        const payload = {
          documentType: docType,
          documentNumber: 'TEST123',
        };

        const state = authReducer(undefined, login(payload));

        expect(state.documentType).toBe(docType);
      });
    });

    it('should preserve all state properties on login', () => {
      const payload = {
        documentType: 'CC' as DocumentType,
        documentNumber: '1111111',
      };

      const state = authReducer(undefined, login(payload));

      expect(state).toHaveProperty('isLoggedIn');
      expect(state).toHaveProperty('documentType');
      expect(state).toHaveProperty('documentNumber');
      expect(state).toHaveProperty('documentEncoded');
    });
  });

  describe('logout action', () => {
    it('should set isLoggedIn to false', () => {
      const initialState = {
        isLoggedIn: true,
        documentType: 'CC' as DocumentType,
        documentNumber: '1234567',
      };

      const state = authReducer(initialState, logout());

      expect(state.isLoggedIn).toBe(false);
    });

    it('should reset document data on logout', () => {
      const initialState = {
        isLoggedIn: true,
        documentType: 'CE' as DocumentType,
        documentNumber: '9876543',
        documentEncoded: 'encoded123',
      };

      const state = authReducer(initialState, logout());

      expect(state.isLoggedIn).toBe(false);
      expect(state.documentType).toBe('CC');
      expect(state.documentNumber).toBe('');
      expect(state.documentEncoded).toBe('');
    });

    it('should work on already logged out state', () => {
      const state = authReducer(undefined, logout());

      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe('multiple actions', () => {
    it('should handle login followed by logout', () => {
      const payload = {
        documentType: 'CC' as DocumentType,
        documentNumber: '1234567',
      };

      let state = authReducer(undefined, login(payload));
      expect(state.isLoggedIn).toBe(true);

      state = authReducer(state, logout());
      expect(state.isLoggedIn).toBe(false);
    });

    it('should handle consecutive logins with different documents', () => {
      let state = authReducer(undefined, {type: ''});

      const payload1 = {
        documentType: 'CC' as DocumentType,
        documentNumber: '1111111',
      };

      state = authReducer(state, login(payload1));
      expect(state.documentNumber).toBe('1111111');

      const payload2 = {
        documentType: 'CE' as DocumentType,
        documentNumber: '2222222',
      };

      state = authReducer(state, login(payload2));
      expect(state.documentNumber).toBe('2222222');
      expect(state.documentType).toBe('CE');
    });
  });
});
