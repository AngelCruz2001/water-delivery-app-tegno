




import { PropsWithChildren } from 'react'
import { StyleProp, ViewStyle, View } from 'react-native'
import { paddingMap } from '../../../config/theme/globalstyle'


type Props = PropsWithChildren & {
    style?: StyleProp<ViewStyle>
}

export const ScreenContainer = ({ children, style }: Props) => {
    return (
        <View style={[{
            flex: 1,
            paddingHorizontal: paddingMap.horizontalContainer,
            paddingTop: paddingMap.verticalContainer,
        }, style]}>
            {children}
        </View>
    )
}
