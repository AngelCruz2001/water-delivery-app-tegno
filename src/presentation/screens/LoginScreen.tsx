


import { StyleSheet, SafeAreaView, Platform, View, Image, Alert } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form from '../components/shared/Form';
import { useForm } from 'react-hook-form';
import { Input } from '../components/shared/input/Input';
import { ScreenContainer } from '../components/shared/ScreenContainer';
import { TLogin, TPostClient } from '../../interfaces/clients';
import { api, saveToken } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackProps } from '../../navigation/RootStackNavigator';
import { AppButton } from '../components/shared';
import { useUserStore } from '../../store/users/useUserStore';

type Props = {}

export const LoginScreen = (props: Props) => {

    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackProps>>();
    const verifyToken = useUserStore(state => state.verifyToken);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: (clientPayload: TLogin) => {
            return api.post('/login', clientPayload)
        },
        onSuccess: async (res) => {
            const token = res.headers.authorization;
            saveToken(token);
            const appToken = await verifyToken()
            // Toast.show({
            //     type: 'createdToast',
            //     text1: '¡Hola!',
            //     text2: 'Que tengas un excelente día',
            // });
            navigation.reset({
                routes: [{ name: 'App Navigator' }],
            });
        },
        onError: (error) => {
            console.log('error: ', JSON.stringify(error, null, 2));
            Toast.show({
                type: 'error',
                text1: 'Usuario o contraseña incorrectos',
            });
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    })

    const onSubmit = (data: TLogin) => {
        mutate(data)
    }

    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === 'android' ? top : 0,
                flex: 1,
            }}
        >
            <ScreenContainer
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                }}
            >
                <View style={{
                    // height: 200,
                    paddingTop: '20%',
                    paddingBottom: '25%',
                    width: '80%',
                    marginHorizontal: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Image source={require('../../assets/logo.png')} />
                </View>
                <Form
                    buttons={(
                        <>
                            <AppButton onPress={handleSubmit(onSubmit)}>
                                Enviar
                            </AppButton>
                        </>
                    )}
                    style={{
                    }} >
                    <Input
                        name="username"
                        label="Nombre de usuario"
                        placeholder="Nombre de usuario"
                        control={control}
                        rules={{
                            required: "Necesitas agregar un nombre de usuario",
                        }}
                        error={errors.username?.message || ''}
                    />
                    <Input
                        isPassword
                        name="password"
                        label="Contraseña"
                        control={control}
                        rules={{
                            required: "Necesitas agregar una contraseña",
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres',
                            }
                        }}
                        error={errors.password?.message || ''}
                    />
                </Form>
            </ScreenContainer>
        </SafeAreaView>
    )
}
