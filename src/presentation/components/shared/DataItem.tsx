
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../../../config/theme/colors'

import { AppText } from './AppText'

type Props = {
    label: string | JSX.Element;
    value: string;
    isLast?: boolean;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

export const DataItem = ({ label, value, isLast, style, color = colors.primary }: Props) => {
    return (
        <>
            <View style={[{ gap: 5, paddingVertical: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, style]}>
                <AppText size='sm' style={{ color: colors.textMuted, maxWidth: '80%' }}>
                    {label}
                </AppText>
                <AppText weight='bold' style={{ display: 'flex', color, flex: .9, textAlign: 'right' }}>
                    {value}
                </AppText>
            </View>
            {!isLast && (
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.background
                }} />
            )}
        </>
    )
}

const styles = StyleSheet.create({})