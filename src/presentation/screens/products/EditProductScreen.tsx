

import { View } from 'react-native'
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProductsStackProps } from '../../../navigation/products/ProductsStackNavigator';
import { AppText } from '../../components/shared/AppText';
import { useHeaderRightNavigationButton } from '../../hooks/useHeaderRightNavigationButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useHeaderRightGoBack } from '../../hooks/useHeaderRightGoBack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TPostProduct } from '../../../interfaces/products';
import Form from '../../components/shared/Form';
import { AppButton } from '../../components/shared';
import { Input } from '../../components/shared/input/Input';

type Props = NativeStackScreenProps<ProductsStackProps, 'Editar Producto'>;

export const EditProductScreen = ({ route }: Props) => {

    const { product } = route.params

    const { control, handleSubmit, formState: { errors, dirtyFields, isDirty } } = useForm({
        defaultValues: {
            name: product.name,
            price: String(product.price / 100),
            description: product.description,
        }
    });

    const { mutate, isError, isPending, isSuccess, } = useMutation({
        // mutationFn: async (clientPayload: TPostClient) => {
        //     return api.post<{ client: TDisplayClient }>('/clients', clientPayload, {
        //         headers: {
        //             authorization: await getToken(),
        //         },
        //     })
        // },
        // onSuccess: ({ data }) => {
        //     showCreatedToast();
        //     navigation.goBack();
        // },
    })

    const onSubmit = (data: TPostProduct) => {
        // mutate(data)
    }


    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();

    useHeaderRightGoBack(navigation, 'cancelar')

    return (
        <ScreenScrollContainer>
            <Form
                style={{
                    // paddingHorizontal: 15
                }}
                buttons={
                    <>
                        <AppButton
                            disabled={!isDirty || isPending}
                            style={{
                                marginLeft: 'auto',
                                marginTop: 10
                            }}
                            onPress={handleSubmit(onSubmit)}>
                            Editar Cliente
                        </AppButton>
                    </>
                }
            >
                <Input
                    name="name"
                    contrast
                    label="Nombre del producto"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                    isDirty={dirtyFields.name}
                />
                <Input
                    name="price"
                    contrast
                    label="Precio"
                    control={control}
                    keyboardType='numeric'
                    accessoryLeft='dollar'
                    rules={{
                        required: "Necesitas agregar un precio",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.price?.message || ''}
                    isDirty={dirtyFields.price}
                    size={'sm'}
                />
                <Input
                    name="description"
                    contrast
                    label="Descripción"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.description?.message || ''}
                    isDirty={dirtyFields.description}
                />
            </Form>
        </ScreenScrollContainer>
    )
}
