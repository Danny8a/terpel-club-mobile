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
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  date: {
    fontSize: 12,
    color: COLORS.gray,
  },

  description: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 4,
  },

  pointsPositive: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    color: '#1B7F3A',
  },

  pointsNegative: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    color: '#B00020',
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },

  paginationText: {
    color: COLORS.gray,
    fontWeight: '700',
  },

  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  paginationButtonDisabled: {
    backgroundColor: '#ddd',
  },

  paginationButtonEnabled: {
    backgroundColor: COLORS.primary,
  },

  paginationButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
