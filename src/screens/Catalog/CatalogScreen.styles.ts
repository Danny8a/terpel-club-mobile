import {StyleSheet} from 'react-native';
import {COLORS} from '../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },

  /* =====================
     Search
     ===================== */
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: '#ddd',
  },


  empty: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 24,
    fontSize: 14,
  },


  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.lightGray,
  },

  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagePlaceholderText: {
    color: COLORS.gray,
    fontSize: 14,
  },

  info: {
    padding: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 10,
    lineHeight: 18,
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },

  outOfStock: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#B00020',
  },
});
