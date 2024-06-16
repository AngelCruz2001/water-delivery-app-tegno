import { Image, Pressable, View } from "react-native";
import { TProduct } from "../../../interfaces/products";
import { useProductsStore } from "../../../store/products/useProductsStore";
import { AppText } from "../../components/shared"
import { ScreenScrollContainer } from "../../components/shared/ScreenScrollContainer";
import { useGetProducts } from "../../hooks/products/useGetProducts"
import { Card } from "../../components/shared/Card";
import { colors } from "../../../config/theme/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProductsStackProps } from "../../../navigation/products/ProductsStackNavigator";
import { FAB } from "../../components/shared/fab/Fab";
import { ScreenContainer } from "../../components/shared/ScreenContainer";
import { parsePrice } from "../../../helpers/price";

export const ProductsScreen = () => {

    const { isLoading, isError, refetch } = useGetProducts();
    const products = useProductsStore(state => state.products);
    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();

    return (
        <>
            <ScreenScrollContainer
                onRefresh={refetch}
            >
                {
                    products.map((product: TProduct) => (
                        <Pressable
                            key={product._id}
                            onPress={() => {
                                navigation.navigate('Producto', { product })
                            }}
                        >
                            <Card
                                style={{
                                    paddingVertical: 20,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    gap: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <Image source={{
                                    uri: product.image.url
                                }}
                                    style={{
                                        width: 80,
                                        aspectRatio: 1,
                                        objectFit: 'contain'
                                    }}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View>
                                        <AppText
                                            style={{
                                                textTransform: 'capitalize'
                                            }}
                                        >{product.name}
                                        </AppText>
                                        <AppText
                                            size="xs"
                                            style={{
                                                textTransform: 'uppercase',
                                                color: colors.textMuted
                                            }}
                                        >{product.description}
                                        </AppText>
                                    </View>
                                    <AppText
                                        weight="bold"
                                        size="xl"
                                        style={{
                                            color: colors.primary,
                                            marginTop: 10
                                        }}
                                    >${parsePrice(product.price)}
                                    </AppText>
                                </View>
                            </Card>
                        </Pressable>
                    ))
                }
            </ScreenScrollContainer>

            <FAB
                iconName="plus"
                onPress={() => {
                    navigation.navigate("Crear producto")
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}
