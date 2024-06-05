


import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { ClientStackProps } from '../../navigation/clients/ClientsStackNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../config/theme/colors'
import { paddingMap } from '../../config/theme/globalstyle'

// type Props<T extends {}> = {
//     iconName: string;
//     size?: number;
//     navigation: NavigationProp<T>
//     navigate: {
//         screen: keyof T,
//         params?: T[keyof T] | undefined;
//     }
// }



type NavigateParams<T extends Record<string, object | undefined>> = {
    screen: keyof T;
    params?: T[keyof T];
};


type Props<T extends Record<string, object | undefined>> = {
    iconName: string;
    size?: number;
    navigation: NavigationProp<T>;
    navigate: NavigateParams<T>;
};

export const useHeaderRightNavigationButton = <T extends ParamListBase>({ iconName, navigate, navigation, size = 25 }: Props<T>) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable
                        style={{
                            marginRight: paddingMap.headerButton
                        }}
                        onPress={() => {
                            if (navigate.params) {
                                return navigation.navigate(navigate.screen as any, navigate.params as any);
                            }
                            navigation.navigate(navigate.screen as never)
                        }}
                    >
                        <Icon name={iconName} size={size} color={colors.primary} />
                    </Pressable>
                )
            }
        })

    }, [])
    return ({})
}

const styles = StyleSheet.create({})