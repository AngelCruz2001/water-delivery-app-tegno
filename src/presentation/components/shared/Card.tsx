


import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle'
import { colors } from '../../../config/theme/colors'

type Props = PropsWithChildren & {
    style?: ViewStyle
}

export const Card = ({ style, children }: Props) => {
    return (
        <View
            style={[{
                backgroundColor: colors.white, padding: paddingMap.horizontalCard, borderRadius: roundedMap.sm,
                shadowColor: colors.textMuted,
                shadowOffset: { width: 0.5, height: 0.27 },
                shadowOpacity: 0.3,
                elevation: 5
            }, style]}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})