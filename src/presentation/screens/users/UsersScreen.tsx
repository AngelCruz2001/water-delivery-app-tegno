
import React, { useEffect } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UsersClientsTabsProps } from '../../../navigation/users/UsersClientsTabsNavigator';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';
import { AppButton, AppText } from '../../components/shared';
import { useGetUsers } from '../../hooks/users/useGetUsers';
import { useUserStore } from '../../../store/users/useUserStore';
import { Alert, View } from 'react-native';
import { DisplayUser } from '../../components/users/DisplayUser';
import { FAB } from '../../components/shared/fab/Fab';
import { UserStackProps } from '../../../navigation/users/UserStackNavigator';

type Props = {}

export const UsersScreen = (props: Props) => {

    const { isLoading, isError, refetch } = useGetUsers();
    const users = useUserStore(state => state.users);
    const navigation = useNavigation<NavigationProp<UserStackProps>>();

    return (
        <>
            <ScreenScrollContainer
                onRefresh={() => refetch()}
                style={{
                }}
            >
                <View>

                    {
                        users?.map(user => (
                            <DisplayUser
                                key={user._id}
                                user={user}
                            />
                        ))
                    }
                </View>
            </ScreenScrollContainer>
            <FAB
                iconName='person-add'
                iconProvider='Ionicons'
                onPress={() => {
                    navigation.navigate('Crear usuario')
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}
