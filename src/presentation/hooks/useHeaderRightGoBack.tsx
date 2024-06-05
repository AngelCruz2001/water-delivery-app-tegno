import { NavigationProp } from "@react-navigation/native"
import { useEffect } from "react"
import { Pressable } from 'react-native';
import { AppText } from "../components/shared";
import { paddingMap } from "../../config/theme/globalstyle";
import { colors } from "../../config/theme/colors";



export const useHeaderRightGoBack = <T extends {}>(navigation: NavigationProp<T>, text: string, color = colors.redLight) => {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <AppText
                        style={{
                            // color: colors.red,
                            color,
                            marginHorizontal: paddingMap.horizontalContainer,
                        }}
                    >{text}
                    </AppText>
                </Pressable>
            )
        })
    }, [])
}