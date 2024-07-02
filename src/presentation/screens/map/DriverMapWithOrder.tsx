import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"
import { ScreenContainer } from "../../components/shared/ScreenContainer"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppButton } from "../../components/shared"
import { BottomSheet } from "../../components/shared/BottomSheet"
import { MapOrderSale } from "./MapOrderSale"


export const DriverMapWithOrder = () => {

    const navigation = useNavigation();

    return (
        <>
            <ScreenContainer>
                <SafeAreaView>
                    <Text>DriverMapWithOrder</Text>
                    <AppButton
                        onPress={() => navigation.goBack()}
                    >
                        Regresar
                    </AppButton>
                </SafeAreaView>
            </ScreenContainer>
            <BottomSheet>
                <MapOrderSale />
            </BottomSheet>
        </>
    )
}
