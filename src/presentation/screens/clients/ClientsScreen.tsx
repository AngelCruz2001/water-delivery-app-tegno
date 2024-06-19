
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { TDisplayClient } from '../../../interfaces/clients'
import { useGetClients } from '../../hooks/clients/useGetClients'
import { DisplayClient } from '../../components/clients/DisplayClient'
import { FAB } from '../../components/shared/fab/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator'
import { useClientsStore } from '../../../store/clients/useClientsStore'
import { colors } from '../../../config/theme/colors';

export const ClientsScreen = () => {

    const { isLoading, isError } = useGetClients();
    const clients = useClientsStore(state => state.clients);
    const navigation = useNavigation<NavigationProp<ClientStackProps>>();


    return (
        <>

            <ScreenScrollContainer>
                {
                    clients.map((client: TDisplayClient) => (
                        <DisplayClient
                            key={client._id}
                            client={client}
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