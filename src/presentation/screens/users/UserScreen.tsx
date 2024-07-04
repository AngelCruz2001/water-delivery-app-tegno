
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { UserStackProps } from '../../../navigation/users/UserStackNavigator';
import { ScreenContainer } from '../../components/shared/ScreenContainer';
import { AppText } from '../../components/shared';
import { FAB } from '../../components/shared/fab/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../../store/users/useUserStore';
import { Loader } from '../../components/shared/Loader';

type Props = NativeStackScreenProps<UserStackProps, 'Usuario'>;

export const UserScreen = (props: Props) => {

    const { userId } = props.route.params;
    const navigation = useNavigation<NavigationProp<UserStackProps>>();
    const users = useUserStore(state => state.users);

    const user = users.find(user => user._id === userId);

    if (!user) return (
        <Loader />
    )

    return (
        <>
            <ScreenContainer>
                <AppText>
                    Usuario
                </AppText>
            </ScreenContainer>
            <FAB
                iconName='pencil'
                onPress={() => {
                    navigation.navigate('Editar Usuario', { user })
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}


const styles = StyleSheet.create({})