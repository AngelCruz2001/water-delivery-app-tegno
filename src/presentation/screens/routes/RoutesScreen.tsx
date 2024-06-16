
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { TDisplayEnrichedRoute } from '../../../interfaces/routers'
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRouters } from '../../hooks/routers/useGetRoutes'
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { DisplayRoute } from '../../components/routes/DisplayRoute'
import { FAB } from '../../components/shared/fab/Fab'



type Props = {}


export const RoutesScreen = (props: Props) => {

    const { isLoading, isError } = useGetRouters();
    const routes = useRoutesStore(state => state.routes);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    return (
        <>

            <ScreenScrollContainer>
                {
                    routes.map((route: TDisplayEnrichedRoute) => (
                        <DisplayRoute
                            key={route._id}
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
