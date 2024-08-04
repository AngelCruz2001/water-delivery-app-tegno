


import React from 'react'
import { ScreenContainer } from '../../../components/shared/ScreenContainer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RoutesStackProps } from '../../../../navigation/routes/RoutesStackNavigator'
import { AppButton } from '../../../components/shared'
import { useForm } from 'react-hook-form'
import Form from '../../../components/shared/Form'
import { Input } from '../../../components/shared/input/Input'
import { useRoutesStore } from '../../../../store/routes/useRoutesStore'
import { formatDate, getWeekDaysFromArray } from '../../../../helpers/date'
import { TPostRoute } from '../../../../interfaces/routers'
import { postRoute } from '../../../../store/routes/api/postRoute'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { showCreatedToast, showErrorToast } from '../../../components/toasts/toasts'
import { useUiStore } from '../../../../store/ui/useUiStore'

export const RouteFormName = () => {

    const newRoute = useRoutesStore(state => state.newRoute);
    const setNewRoute = useRoutesStore(state => state.setNewRoute);
    const addRoute = useRoutesStore(state => state.addRoute);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();
    const setIsLoading = useUiStore(state => state.setIsLoading);
    const { control, formState: { errors }, getValues } = useForm({
        defaultValues: {
            routeName: newRoute.driverName + ' - ' + getWeekDaysFromArray(newRoute.scheduledDays)
        }
    })
    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (routePayload: TPostRoute) => {
            setIsLoading(true)
            return postRoute(routePayload)
        },
        onError(error, variables, context) {
            console.log("Error creating route", { error, variables, context })
            setIsLoading(false)
            showErrorToast('Error creando ruta');
        },
        onSuccess: (data) => {
            console.log("res: ", data, dayjs())
            addRoute(data);
            setNewRoute({
                driverId: '',
                driverName: '',
                scheduledDays: [],
                routeName: '',
            });
            showCreatedToast('Ruta creado con éxito');
            setIsLoading(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'RoutesScreen' }],
            });
        },
    })


    return (
        <ScreenContainer>
            <Form
                buttons={
                    <AppButton
                        onPress={() => {
                            const routeName = getValues('routeName');
                            mutate({ ...newRoute, routeName })
                        }}
                    >
                        Crear ruta
                    </AppButton>
                }
            >

                <Input
                    name="routeName"
                    contrast
                    label="Nombre de ruta"
                    placeholder=""
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.routeName?.message || ''}
                />
            </Form>
        </ScreenContainer>
    )
}
