



import React from 'react'
import { ReactElement } from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';
import { colors } from '../../../config/theme/colors';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';


type Props = {
    label: string;
    description: string;
    Button: ReactElement;
    highlight: string;
}

export const InfoCard = ({
    label, description,
}: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.white,
                width: '100%',
                paddingHorizontal: paddingMap.horizontalCard,
                paddingVertical: paddingMap.verticalCard,
                flexDirection: 'row',
                gap: 5,
                borderRadius: roundedMap.sm
            }}
        >
            <View style={{ gap: 2, justifyContent: 'space-between' }}>
                <AppText size='sm' weight='bold' style={{ color: colors.primary }}>
                    {description}
                </AppText>
                <AppText>
                    {label}
                </AppText>
            </View>
            <View style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flex: 1,
            }}>
                <AppText style={{ color: colors.textMuted }}>
                    Col. Gillermina 507
                </AppText>
            </View>
        </View>
    )
}
