import {darken, lighten} from './helpers';

export const colors = {
  primary: 'rgb(11, 96, 176)',
  primaryDark: darken('rgb(11, 96, 176)', 4),
  primaryLight: 'rgb(52, 183, 255)',
  secondary: 'rgb(0, 192, 165)',
  accent: 'rgb(59, 32, 23)',
  titles: 'rgb(11, 84, 62)',
  white: 'rgb(255, 255, 255)',
  text: 'rgb(2, 21, 15)',
  textLight: 'rgb(64, 162, 216)',
  textMuted: 'rgb(99, 151, 179)',
  // background: 'rgb(226, 245, 255)',
  background: 'rgb(255, 255, 255)',
  muted: 'rgb(224, 224, 224)',
  foreground: 'rgb(255, 243, 236)',
  red: 'rgb(190, 19, 15)',
  redLight: lighten('rgb(190, 19, 15)', 0.1),
  success: 'rgb(50, 199, 85)',
  successDark: darken('rgb(50, 199, 85)', 7),
  warning: 'rgb(255, 149, 0)',
  warningDark: 'rgb(255, 149, 0)',
};
