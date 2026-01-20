// Test utilities and helpers
export const createMockAuthState = (overrides = {}) => {
  return {
    isLoggedIn: false,
    documentType: 'CC' as const,
    documentNumber: '',
    ...overrides,
  };
};

export const createMockStore = (initialState = {}) => {
  return {
    getState: () => ({
      auth: createMockAuthState(initialState),
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };
};

export const validDocumentNumbers = {
  cc: ['1234567890', '98765432', '1111111111'],
  ce: ['123456', '9876543', '555555'],
  pa: ['AB123456', 'CD789012', 'XY345678'],
};

export const invalidDocumentNumbers = [
  '',
  '    ',
  '123', // too short
  '12', // too short
];
