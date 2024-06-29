

import { Image as RNImage, View } from 'react-native'
import React, { useState } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProductsStackProps } from '../../../navigation/products/ProductsStackNavigator';
import { AppText } from '../../components/shared/AppText';
import { useHeaderRightNavigationButton } from '../../hooks/useHeaderRightNavigationButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useHeaderRightGoBack } from '../../hooks/useHeaderRightGoBack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TPostProduct, TProduct } from '../../../interfaces/products';
import Form from '../../components/shared/Form';
import { AppButton } from '../../components/shared';
import { Input } from '../../components/shared/input/Input';
import { api, getToken } from '../../api/api';
import { showCreatedToast, showErrorToast } from '../../components/toasts/toasts';
import { useProductsStore } from '../../../store/products/useProductsStore';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { Card } from '../../components/shared/Card';
import { PhotoLibraryAdapter } from '../../../config/adapters/photo-library.adapter';
import { colors } from '../../../config/theme/colors';
import { Image } from 'react-native-compressor';

type Props = NativeStackScreenProps<ProductsStackProps, 'Editar Producto'>;

export const EditProductScreen = ({ route }: Props) => {

    const { productId } = route.params
    const products = useProductsStore((state) => state.products);
    const setProducts = useProductsStore((state) => state.setProducts);
    const product = products.find(p => p._id === productId) as TProduct;
    const [image, setImage] = useState(product?.image.url || "");

    const { control, handleSubmit, formState: { errors, dirtyFields, isDirty }, getValues } = useForm({
        defaultValues: {
            name: product.name,
            price: String(product.price / 100),
            description: product.description,
        }
    });

    const { mutate, isError: isMutateError, isPending, isSuccess, } = useMutation({
        mutationFn: async (clientPayload: TPostProduct) => {

            const formData = new FormData();
            if (clientPayload.name !== product.name) formData.append('name', clientPayload.name);
            if (clientPayload.description !== product.description) formData.append('description', clientPayload.description);
            if (clientPayload.price !== String(product.price / 100)) formData.append('price', clientPayload.price);
            if (image !== product?.image.url) {
                const result = await Image.compress(image);
                const type = result.split('.')[1];
                console.log({ type })
                formData.append('image', {
                    uri: result,
                    type: 'image/' + type,
                    name: 'photo.' + type
                })
                formData.append('key', product?.image.key)
            };
            return api.patch<TProduct>(`/products/${product._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: await getToken(),
                },
            })
        },
        onSuccess: ({ data }) => {
            showCreatedToast("Producto editado con éxito");
            setProducts(products.map(p => p._id === data._id ? data : p));
            // navigation.reset({
            //     index: 1,
            //     routes: [{ name: 'Productos' }, { name: 'Producto', params: { productId: data._id } }],
            // });
            navigation.goBack();
        },
        onError: (error) => {
            console.log({ error })
            showErrorToast('Error al editar el producto');
        }

    })

    const onSubmit = () => {
        const data = getValues()
        mutate(data)
    }


    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();

    useHeaderRightGoBack(navigation, 'cancelar')

    if (!product) {
        return null
    }


    // <>
    //     <AppButton
    //         disabled={!isDirty || isPending}
    //         style={{
    //             marginLeft: 'auto',
    //             marginTop: 10
    //         }}
    //         onPress={handleSubmit(onSubmit)}>
    //         Editar Producto
    //     </AppButton>

    // const isDirtyForm = (image === product?.image.url) || !isDirty
    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <>
                        <AppButton
                            disabled={isPending}
                            style={{
                                marginLeft: 'auto',
                                marginTop: 10
                            }}
                            onPress={handleSubmit(onSubmit)}>
                            Editar Producto
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
                            <RNImage
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
                            const type = photos[0].split('.')[1];
                            console.log({ type })
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
