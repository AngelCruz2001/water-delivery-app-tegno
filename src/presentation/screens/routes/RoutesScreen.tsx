
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { TDisplayEnrichedRoute } from '../../../interfaces/routers'
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRoutes } from '../../hooks/routers/useGetRoutes'
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { DisplayRoute } from '../../components/routes/DisplayRoute'
import { FAB } from '../../components/shared/fab/Fab'



type Props = {}


export const RoutesScreen = (props: Props) => {

    const { isLoading, isError, refetch } = useGetRoutes();
    const routes = useRoutesStore(state => state.routes);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    console.log(JSON.stringify(routes, null, 2))
    return (
        <>
            <ScreenScrollContainer
                onRefresh={() => refetch()}
            >
                {
                    routes.map((route: TDisplayEnrichedRoute, index) => (
                        <DisplayRoute
                            key={index}
                            route={route}
                        />
                    ))
                }
            </ScreenScrollContainer>
            <FAB
                // iconProvider='Ionicons'
                iconName="plus"
                onPress={() => {
                    navigation.navigate('DateTab')
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}
