




import { PropsWithChildren } from 'react'
import { StyleProp, ViewStyle, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { paddingMap } from '../../../config/theme/globalstyle'


type Props = PropsWithChildren & {
    style?: StyleProp<ViewStyle>
    withPadding?: boolean
}

export const ScreenContainer = ({ children, style, withPadding = true }: Props) => {
    return (
        <KeyboardAvoidingView

            style={{
                flex: 1,
                paddingBottom: withPadding ? 20 : 0
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[{
                    flex: 1,
                    paddingHorizontal: paddingMap.horizontalContainer,
                    paddingTop: paddingMap.verticalContainer,
                }, style]}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
