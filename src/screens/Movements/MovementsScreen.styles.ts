import {StyleSheet} from 'react-native';
import {COLORS} from '../../config/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.lightGray, padding: 16},
  title: {fontSize: 20, fontWeight: '700', marginBottom: 12, color: COLORS.black},
  loading: {color: COLORS.gray},
  error: {color: 'red', marginBottom: 12},

  movementCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  movementRow: {flexDirection: 'row', justifyContent: 'space-between', gap: 12},
  movementTitle: {flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.black},
  movementPoints: {fontSize: 14, fontWeight: '800'},
  positive: {color: COLORS.primaryPositive},
  negative: {color: '#B00020'},

  movementMetaRow: {marginTop: 8, flexDirection: 'row', justifyContent: 'space-between'},
  movementMeta: {fontSize: 12, color: COLORS.gray, maxWidth: '60%'},

  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  pageBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  pageBtnDisabled: {opacity: 0.5},
  pageBtnText: {color: COLORS.white, fontWeight: '700'},
  pageInfo: {color: COLORS.black, fontWeight: '700'},
});
