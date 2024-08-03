import React from 'react'
import { Pressable, View } from 'react-native'
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle'
import { colors } from '../../../config/theme/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { AppText } from '../shared'
import { lighten } from '../../../config/theme/helpers';
import { MapOrderSale } from '../../screens/map/MapOrderSale';

type DriverCardNameProps = {
    driverId: string,
    driverName: string,
    onPress: (driverId: string) => void 
}
export const DriverCardName = ({ driverId, driverName, onPress }: DriverCardNameProps) => {
    const [pressed, setPressed] = React.useState(false)

    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                height: 60,
                elevation: 1,
                paddingHorizontal: 11,
                paddingVertical: 15,
                borderRadius: roundedMap.sm,
                shadowColor: lighten(colors.accent, .9),
                shadowOpacity: !pressed ? .5 : .2,
                shadowRadius: pressed ? 4 : 2,
            }}
            onPress={() => onPress(driverId)}
        >

            <View style={{
                borderRadius: roundedMap.full,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                width: 45
            }}
            >
                <Icon
                    name='car'
                    size={25}
                    color={colors.white}
                />
            </View>
            <AppText size='lg'>
                {driverName}
            </AppText>
        </Pressable>


    )
}
