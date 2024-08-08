
import { colors } from "../../../config/theme/colors"

import { Pressable, StyleProp, ViewStyle } from "react-native"
import { darken, lighten } from "../../../config/theme/helpers"
import { PropsWithChildren, ReactElement } from "react"
import { FontSize } from "./sizes"
import { AppText } from "./AppText"
import { roundedMap } from "../../../config/theme/globalstyle"


type ButtonProps = PropsWithChildren & {
    AccesoryLeft?: ReactElement,
    AccesoryRight?: ReactElement,
    onPress?: (data: any) => void,
    size?: FontSize,
    style?: StyleProp<ViewStyle>
    disabled?: boolean,
    color?: string, 
    customBackgroundColor?: string
}

export const AppButton = (props: ButtonProps) => {

    const { children, AccesoryLeft, AccesoryRight, onPress, size, style, disabled = false, color, customBackgroundColor } = props;

    //TODO: color or variant in props
    //TODO: accesory icon (left or right) in props

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => ([{
                backgroundColor: disabled ? colors.textMuted : !pressed ? customBackgroundColor || colors.primary : darken(customBackgroundColor || colors.primary, .5),
                borderRadius: roundedMap.sm,
                shadowOffset: { width: !pressed ? 0 : 0, height: !pressed ? 0 : 0 },
                shadowColor: lighten(colors.accent, .7),
                shadowOpacity: !pressed ? .5 : .2,
                shadowRadius: pressed ? 4 : 2,
                elevation: 10,
                position: 'relative',
                // borderWidth: 2,
                // borderColor: !pressed ? colors.primary : darken(colors.primary, .8),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                paddingVertical: 11,
                gap: 5,
            }, style])}
        >

            {({ pressed }) => (
                <>
                    {AccesoryLeft && AccesoryLeft}

                    <AppText
                        size={size}
                        style={{
                            color: color ? color : disabled ? colors.background : colors.white,
                            fontWeight: 'bold',
                        }}>
                        {children}
                    </AppText>

                    {AccesoryRight && AccesoryRight}
                </>
            )}
        </Pressable>
    )
}
