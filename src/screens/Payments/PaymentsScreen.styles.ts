import {StyleSheet} from 'react-native';
import {COLORS} from '../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  label: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '700',
  },

  pointsCard: {
    marginVertical: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },

  pointsLabel: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '600',
    marginBottom: 4,
  },

  pointsBalance: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF9800',
  },

  input: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.black,
  },

  helper: {
    marginTop: 8,
    color: COLORS.gray,
    fontSize: 12,
  },

  error: {
    marginTop: 8,
    color: '#B00020',
    fontSize: 12,
    fontWeight: '700',
  },

  button: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#ddd',
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
  },

  successBox: {
    marginTop: 14,
    backgroundColor: '#E9F7EF',
    borderRadius: 12,
    padding: 12,
  },

  successText: {
    color: '#1B7F3A',
    fontWeight: '800',
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },

  productCardDisabled: {
    opacity: 0.6,
  },

  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },

  productDescription: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
  },

  productPoints: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF9800',
  },

  productButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  productButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },

  productButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
  },

  filterContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray,
  },

  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  filterChipActive: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
  },

  filterChipTextActive: {
    color: COLORS.white,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActive: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },

  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.black,
  },

  resultsCount: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 12,
    fontWeight: '600',
  },

  searchInput: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
