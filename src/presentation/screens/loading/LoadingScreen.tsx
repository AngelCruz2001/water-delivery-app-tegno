


import { ActivityIndicator, Text, View } from 'react-native'
import { colors } from '../../../config/theme/colors'

export const LoadingScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={30} color={colors.primary} />
        </View>
    )
}
