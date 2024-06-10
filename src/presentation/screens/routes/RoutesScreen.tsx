import { Text, View } from 'react-native'
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { Card } from '../../components/shared/Card'
import { DataItem } from '../../components/shared/DataItem'
import { TDisplayRoute } from '../../../interfaces/routers'
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRouters } from '../../hooks/routers/useGetRoutes'
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { DisplayRoute } from '../../components/routes/DisplayRoute'
import { FAB } from '../../components/shared/fab/Fab'
import { colors } from '../../../config/theme/colors'


type Props = {}

//TODO: Create routes to add in the icons

export const RoutesScreen = (props: Props) => {

    const { isLoading, isError } = useGetRouters();
    const routes = useRoutesStore(state => state.routes);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    return (
        <>

            <ScreenScrollContainer>
                {
                    routes.map((route: TDisplayRoute) => (
                        <DisplayRoute
                            key={route._id}
                            route={route}
                        />
                    ))
                }
            </ScreenScrollContainer>
            <FAB
                iconProvider='Ionicons'
                iconName="person-add"
                onPress={() => {
                    navigation.navigate('Crear Cliente')
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
            <FAB
                iconName="map"
                onPress={() => {
                    navigation.navigate('Mapa de Clientes')
                }}
                style={{
                    bottom: 75,
                    right: 15,
                    backgroundColor: colors.primary
                }}
            // iconColor={colors.white}
            />
        </>
    )
}
