import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { Path, Svg } from "react-native-svg";
import { HomeIconSelected } from "../components/icons/HomeIcon";



export const useRenderSideMenuToggle = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} style={{ backgroundColor: 'red', height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>

                </Pressable>
            )
        })
    }, [])

}