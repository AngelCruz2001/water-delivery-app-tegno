import { NavigationProp } from "@react-navigation/native"
import { useEffect } from "react"
import { Pressable, View } from "react-native"
import { paddingMap } from "../../config/theme/globalstyle"
import { colors } from "../../config/theme/colors"
import { AppText } from "../components/shared"


export const useHeaderCanGoBack = <T extends {}>(navigation: NavigationProp<T>) => {

    useEffect(() => {
        header: () => (
            navigation.canGoBack() && (
                <View style={{
                    paddingVertical: paddingMap.horizontalCard,
                    backgroundColor: colors.background,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                }}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                    >
                        <AppText
                            style={{
                                color: colors.primary,
                            }}
                        >
                            {'<'} volver
                        </AppText>
                    </Pressable>
                </View>
            )
        )
    }, [])


}