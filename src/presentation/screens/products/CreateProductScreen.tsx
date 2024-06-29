


import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppButton, AppText } from '../../components/shared'
import { paddingMap } from '../../../config/theme/globalstyle'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ProductsStackProps } from '../../../navigation/products/ProductsStackNavigator'
import { useHeaderRightGoBack } from '../../hooks/useHeaderRightGoBack'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import Form from '../../components/shared/Form'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/shared/input/Input'
import { Card } from '../../components/shared/Card'
import { PhotoLibraryAdapter } from '../../../config/adapters/photo-library.adapter'
import { colors } from '../../../config/theme/colors'
import { TPostProduct, TProduct } from '../../../interfaces/products'
import { api, getToken } from '../../api/api'
import { useProductsStore } from '../../../store/products/useProductsStore'
import { useMutation } from '@tanstack/react-query'
import { postProduct } from '../../../store/products/api/postProduct'
import { showCreatedToast } from '../../components/toasts/toasts'

type Props = {}

export const CreateProductScreen = (props: Props) => {

    const addProduct = useProductsStore(state => state.addProduct);
    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();
    useHeaderRightGoBack(navigation, 'Cancelar');

    const { control, handleSubmit, formState: { errors, isLoading } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
        }
    });

    const [image, setImage] = useState("");

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (productPayload: TPostProduct) => {
            const formData = new FormData();
            formData.append('name', productPayload.name);
            formData.append('description', productPayload.description);
            formData.append('price', productPayload.price);
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg'
            });
            return postProduct(formData);
        },
        onSuccess: (user) => {
            addProduct(user);
            showCreatedToast('Producto registrado');
            navigation.goBack();
        }
    })

    const onSubmit = async (data: TPostProduct) => {
        mutate(data)
    }

    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <>
                        <AppButton
                            disabled={(image === "") || isLoading}
                            onPress={handleSubmit(onSubmit)}>
                            Crear Producto
                        </AppButton>
                    </>
                }
            >
                <Input
                    size='md'
                    name="name"
                    label="Nombre"
                    placeholder="Nombre del producto"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />
                <Input
                    size='sm'
                    name="price"
                    accessoryLeft='dollar'
                    placeholder="Precio"
                    label="Precio"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un precio",
                    }}
                    error={errors.price?.message || ''}

                    keyboardType="number-pad"
                />
                <Input
                    name="description"

                    label="Descripción"
                    placeholder="ej. 20L ó 600ml, etc"
                    control={control}
                    rules={{
                        required: "agrega una medida",
                    }}

                    error={errors.description?.message || ''}
                />
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <AppText style={{
                        fontWeight: 'bold',
                    }}>Imagen</AppText>
                    {image && (
                        <Card
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 200,
                                    aspectRatio: 1,
                                    objectFit: 'contain'
                                }}
                            />
                        </Card>
                    )}
                    <AppButton
                        onPress={async () => {
                            const photos = await PhotoLibraryAdapter.getPictuersFromLibrary();
                            setImage(photos[0]);
                        }}
                        style={{
                            alignSelf: 'flex-start',
                            backgroundColor: colors.secondary,
                            marginTop: 10,
                            marginBottom: 20
                        }}
                        size='sm'
                    >
                        {image ? 'Cambiar imagen' : 'Subir imagen'}
                    </AppButton>
                </View>
            </Form>
        </ScreenScrollContainer>
    )
}
