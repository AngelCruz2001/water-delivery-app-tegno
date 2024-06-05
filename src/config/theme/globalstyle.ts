import {DimensionValue, StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {},
});

export const paddingMap = {
  verticalContainer: 10,
  horizontalContainer: 15,
  verticalCard: 15,
  horizontalCard: 12,
  headerButton: 10,
};

export const roundedMap = {
  sm: 5,
  md: 8,
  lg: 12,
  full: 500,
};

export const inputSizeMap = {
  sm: '30%' as DimensionValue,
  md: '45%' as DimensionValue,
  lg: '100%' as DimensionValue,
};
