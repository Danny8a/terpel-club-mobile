import {StyleSheet} from 'react-native';
import {COLORS} from '../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
    marginTop: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
  },
  pickerOptionActive: {
    backgroundColor: COLORS.white,
  },
  pickerText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  pickerTextActive: {
    color: COLORS.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 12,
    marginTop: 30,
    opacity: 0.8,
  },
});