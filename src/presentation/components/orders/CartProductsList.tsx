import { Image, Pressable, ScrollView, View } from "react-native";
import { paddingMap, roundedMap } from "../../../config/theme/globalstyle";
import { TProduct } from "../../../interfaces/products";
import { TCreateOrderDto } from "../../../interfaces/order";
import { Card } from "../shared/Card";
import { AppText } from "../shared";
import { colors } from "../../../config/theme/colors";
import { parsePrice } from "../../../helpers/price";




type Props = {
    products: TProduct[];
    order: TCreateOrderDto;
    setOrder: (order: TCreateOrderDto) => void;
    height?: number;
}

export const CartProductsList = (props: Props) => {
    const {
        products,
        order,
        setOrder,
        height = 250,
    } = props;
    console.log({
        products
    })
    return (
        <ScrollView style={{
            maxHeight: height,
            paddingVertical: 2,
        }}>
            {products.map((product) => {
                const productExists = order.products.find(p => p.productId === product._id);

                return (
                    <Pressable
                        key={product._id}
                        onPress={() => {
                            // navigation.navigate('Producto', { product })
                        }}
                    >
                        <Card
                            style={{
                                paddingVertical: 10,
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
                                    width: 40,
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <AppText
                                        weight="bold"

                                        style={{
                                            color: colors.primary,
                                            marginTop: 10
                                        }}
                                    >${parsePrice(product.price)}
                                    </AppText>
                                    {
                                        productExists ? (
                                            <>
                                                <View
                                                    style={{
                                                        gap: 10,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Pressable
                                                        style={{
                                                            height: 30,
                                                            width: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: colors.primary,
                                                            borderRadius: roundedMap.full
                                                        }}
                                                        onPress={() => {
                                                            const orderProducts = order.products.filter(p => p.productId !== product._id);
                                                            if (productExists.quantity === 1) {
                                                                setOrder({
                                                                    ...order,
                                                                    products: orderProducts
                                                                })
                                                            } else {
                                                                setOrder({
                                                                    ...order,
                                                                    products: [...orderProducts,
                                                                    {
                                                                        productId: product._id,
                                                                        quantity: productExists.quantity - 1,
                                                                        name: product.name,
                                                                        price: product.price
                                                                    }
                                                                    ]
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        <AppText
                                                            style={{
                                                                color: colors.white
                                                            }}
                                                        >
                                                            -
                                                        </AppText>
                                                    </Pressable>
                                                    <AppText>
                                                        {productExists.quantity}
                                                    </AppText>
                                                    <Pressable
                                                        onPress={() => {
                                                            const orderProducts = order.products.filter(p => p.productId !== product._id);
                                                            setOrder({
                                                                ...order,
                                                                products: [...orderProducts,
                                                                {
                                                                    productId: product._id,
                                                                    quantity: productExists.quantity + 1,
                                                                    name: product.name,
                                                                    price: product.price
                                                                }
                                                                ]
                                                            })
                                                        }}
                                                        style={{
                                                            height: 30,
                                                            width: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: colors.primary,
                                                            borderRadius: roundedMap.full
                                                        }} >
                                                        <AppText
                                                            style={{
                                                                color: colors.white
                                                            }}
                                                        >
                                                            +
                                                        </AppText>
                                                    </Pressable>
                                                </View>
                                            </>
                                        ) : (
                                            <>

                                                <Pressable
                                                    style={{
                                                        borderRadius: roundedMap.full,
                                                        backgroundColor: colors.primary,
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 5
                                                    }}
                                                    onPress={() => {
                                                        setOrder({
                                                            ...order,
                                                            products: [...order.products, {
                                                                productId: product._id,
                                                                quantity: 1,
                                                                name: product.name,
                                                                price: product.price
                                                            }]
                                                        })
                                                    }}
                                                >
                                                    <AppText
                                                        size='sm'
                                                        style={{
                                                            color: colors.white
                                                        }}>
                                                        Agregar
                                                    </AppText>
                                                </Pressable></>
                                        )
                                    }
                                </View>
                            </View>

                        </Card>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
