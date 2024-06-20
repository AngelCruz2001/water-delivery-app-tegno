



import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { AppText } from '../../components/shared'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator';


type Props = NativeStackScreenProps<RoutesStackProps, 'RouteScreen'>;

export const RouteScreen = ({ route }: Props) => {

    const { params: { enrichedRoute } } = route;

    console.log({ enrichedRoute })

    return (
        <ScreenScrollContainer>
            <AppText>Holaaa Ruta</AppText>
        </ScreenScrollContainer>
    )
}
