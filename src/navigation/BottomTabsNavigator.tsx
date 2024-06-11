import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useReducer } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { HomeIcon, HomeIconSelected } from '../presentation/components/icons/HomeIcon';
import { PersonIcon, PersonIconSelected } from '../presentation/components/icons/PersonIcon';
import { ProductsIcon, ProductsIconSelected } from '../presentation/components/icons/ProductsIcon';
import { OrdersIcon, OrdersIconSelected } from '../presentation/components/icons/OrdersIcon';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { HomeStackNavigator } from '.';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../config/theme/colors';
import { roundedMap } from '../config/theme/globalstyle';
import { ClientStackNavigator } from './clients/ClientsStackNavigator';
import { ProductsStackNavigator } from './products/ProductsStackNavigator';
import { useUserStore } from '../store/users/useUserStore';
import { UsersClientsTabsNavigator } from './users/UsersClientsTabsNavigator';
import { RoutesStackNavigator } from './routes/RoutesStackNavigator';

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function BottomTabsNavigator() {

    const navigation = useNavigation();
    const user = useUserStore(state => state.user);

    console.log({ user })
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false
    //     })
    // }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                    elevation: 0,
                    shadowColor: 'transparent',
                },
                headerLeft: () => (
                    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                        <Icon name="menu" size={25} color="#4F8EF7" />
                    </Pressable>
                )
            }}
            sceneContainerStyle={{ backgroundColor: colors.background }}
            tabBar={(props) => <AnimatedTabBar {...props} />}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: (props) => {

                        return (
                            !props.focused ?
                                <HomeIcon /> :
                                <HomeIconSelected />
                        )
                    }
                }}
            />
            {
                (user?.type === 'super' || user?.type === 'admin') ? (
                    <Tab.Screen
                        name="UsersClientsTabs"
                        component={UsersClientsTabsNavigator}
                        options={{
                            tabBarIcon: (props) => {
                                return (
                                    !props.focused ?
                                        <PersonIcon /> :
                                        <PersonIconSelected />
                                )
                            }
                        }}
                    />
                ) :
                    (
                        <Tab.Screen
                            name="UsersClientsTabs"
                            component={ClientStackNavigator}
                            options={{
                                tabBarIcon: (props) => {
                                    return (
                                        !props.focused ?
                                            <PersonIcon /> :
                                            <PersonIconSelected />
                                    )
                                },
                                headerShown: false
                            }}
                        />
                    )
            }

            {
                (user?.type === 'super' || user?.type === 'admin') && (
                    <Tab.Screen
                        name="Products"
                        component={ProductsStackNavigator}
                        options={{
                            tabBarIcon: (props) => {
                                return (
                                    !props.focused ?
                                        <ProductsIcon /> :
                                        <ProductsIconSelected />
                                )
                            }
                        }}
                    />
                )
            }
            <Tab.Screen
                name="Rutas"
                component={RoutesStackNavigator}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            !props.focused ?
                                <OrdersIcon /> :
                                <OrdersIconSelected />
                        )
                    },
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

type TabBarItemProps = {
    isActive: boolean;
    options: BottomTabNavigationOptions;
    onPress: () => void;
    onLayout: (event: LayoutChangeEvent) => void;
}

const TabBarItem = ({ onPress, onLayout, isActive, options }: TabBarItemProps) => {

    const animatedComponentCircleStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(isActive ? 1 : 0, { duration: 300 })
                }
            ]
        }
    })

    return (
        <Pressable
            onPress={onPress}
            onLayout={onLayout}
            style={styles.item}>
            <Animated.View style={[
                styles.componentCircle,
                animatedComponentCircleStyles
            ]}>
            </Animated.View>
            <Animated.View style={[
                styles.iconContainer
            ]}>
                {options.tabBarIcon ? options.tabBarIcon({ focused: isActive, size: 5, color: 'black' }) : null}
            </Animated.View>
        </Pressable>
    )
}

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps) => {

    const { bottom } = useSafeAreaInsets();

    const reducer = (state: any, action: { x: number, index: number }) => {
        return [...state, { x: action.x, index: action.index }]
    }

    const [layout, dispatch] = useReducer(reducer, []);

    const handleLayout = (event: LayoutChangeEvent, index: number) => {
        dispatch({ x: event.nativeEvent.layout.x, index })
    }

    const xOffset = useDerivedValue(() => {
        if (layout.length !== routes.length) {
            return 0
        }

        return [...layout].find(({ index }) => index === activeIndex)?.x - 22.5
    }, [activeIndex, layout]);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
        }
    })

    return (
        <View style={[
            styles.tabBar, {
                paddingBottom: bottom,
                height: 60 + bottom
            }
        ]}>

            <AnimatedSvg
                width={90}
                height={55}
                viewBox="0 0 90 58"
                style={[styles.activeBackground, animatedStyles]}
            >
                <Path
                    fill={colors.background}
                    d="M17.23 0h60.308v25.846C77.538 42.5 64.038 56 47.385 56 30.73 56 17.23 42.5 17.23 25.846V0zM17.23 17.186V0H0c9.501 0 17.206 7.69 17.23 17.186zm60.308 0V0H94.77c-9.501 0-17.206 7.69-17.23 17.186z"
                />
            </AnimatedSvg>

            <View style={styles.tabBarContainer}>
                {routes.map((route, index) => {
                    const isActive = index === activeIndex;
                    const { options } = descriptors[route.key];


                    return (
                        <TabBarItem key={route.key}
                            options={options}
                            isActive={isActive}
                            onLayout={(event) => handleLayout(event, index)}
                            onPress={() => navigation.navigate(route.name)} />
                    )
                })}
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.primary,
        margin: 0
    },
    activeBackground: {
        position: 'absolute',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    item: {
        height: 50,
        width: 50,
        marginTop: -2,
    },
    componentCircle: {
        flex: 1,
        borderRadius: roundedMap.full,
        backgroundColor: colors.primary,
    },
    iconContainer: {
        position: 'absolute',
        top: 13,
        left: 13,
        bottom: 0,
        right: 0,
        // transform: [{ translateX: -13 }, { translateY: -13 }],
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
})