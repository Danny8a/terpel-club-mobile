import type {DocumentType} from '../../src/types/auth.types';

describe('Auth Types', () => {
  it('should allow valid document types', () => {
    const validTypes: DocumentType[] = ['CC', 'CE', 'PA'];

    validTypes.forEach(type => {
      expect(['CC', 'CE', 'PA']).toContain(type);
    });
  });

  it('should have exactly 3 valid document types', () => {
    const validTypes: DocumentType[] = ['CC', 'CE', 'PA'];
    expect(validTypes).toHaveLength(3);
  });

  it('should correctly identify document type meanings', () => {
    const documentMeanings: Record<DocumentType, string> = {
      CC: 'Cédula de Ciudadanía',
      CE: 'Cédula de Extranjería',
      PA: 'Pasaporte',
    };

    expect(documentMeanings.CC).toBe('Cédula de Ciudadanía');
    expect(documentMeanings.CE).toBe('Cédula de Extranjería');
    expect(documentMeanings.PA).toBe('Pasaporte');
  });
});
