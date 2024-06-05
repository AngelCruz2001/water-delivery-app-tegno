

import { View, Text } from 'react-native'
import { AppButton } from '../../components/shared/AppButton'
import { usePermissionStore } from '../../../store/permissions/usePermissionStore'
import { AppText } from '../../components/shared'

type Props = {}

export const PermissionScreen = (props: Props) => {

    const { locationStatus, requestLocationPermission } = usePermissionStore();

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
        }}>
            <AppText >La ubicación es necesaria para habilitar el mapa</AppText>
            <AppButton
                onPress={requestLocationPermission}
            >
                Habilitar ubicación
            </AppButton>
        </View>
    )
}


//GOOGLE API KEY AIzaSyDZgeinFHDD0A8Kccpr4EEDD0REnwiQzQU