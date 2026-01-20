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

  searchContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },

  searchInput: {
    color: COLORS.black,
    fontSize: 14,
    padding: 0,
  },

card: {
  backgroundColor: COLORS.white,
  borderRadius: 12,
  marginBottom: 14,
  padding: 14,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
},

  info: {
    padding: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
  },

  empty: {
    marginTop: 30,
    color: COLORS.gray,
    textAlign: 'center',
  },
});
