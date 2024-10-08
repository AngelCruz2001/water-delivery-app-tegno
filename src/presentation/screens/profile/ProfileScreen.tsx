import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"
import { ScreenContainer } from "../../components/shared/ScreenContainer"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppButton } from "../../components/shared"
import { BottomSheet } from "../../components/shared/BottomSheet"


export const ProfileScreen = () => {

    const navigation = useNavigation();

    return (
        <>
            <ScreenContainer>
                <SafeAreaView>
                    <Text>ProfileScreen</Text>
                    <AppButton
                        onPress={() => navigation.goBack()}
                    >
                        Regresar
                    </AppButton>
                </SafeAreaView>
            </ScreenContainer>
        </>
    )
}
