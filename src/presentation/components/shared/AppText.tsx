


import { PropsWithChildren } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors } from '../../../config/theme/colors';
import { FontSize, fontSizeMap } from './sizes';

type Props = PropsWithChildren & {
    style?: StyleProp<TextStyle>,
    size?: FontSize,
    weight?: 'normal' | 'bold',
}


export const AppText = ({ style, children, size = 'base', weight = 'normal' }: Props) => {
    return (
        <Text style={[
            {
                color: colors.text,
                fontSize: fontSizeMap[size],
                fontWeight: weight,
            }, style
        ]} >
            {children}
        </Text>
    )
}
