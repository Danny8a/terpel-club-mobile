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
});
