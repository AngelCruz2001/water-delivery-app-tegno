import React, { useEffect } from "react"
import { View } from "react-native"
import { MainMap } from "./MainMap"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackProps } from "../../../navigation/HomeStackNavigator";
import { FAB } from "../../components/shared/fab/Fab";


export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<HomeStackProps>>();

  return (
    <>
      <View style={{ flex: 1, }}>
        <MainMap />
      </View>
      {/* <FAB
        iconName='plus'
        onPress={() => {
          navigation.navigate('HomeCreateClient')
        }}
        style={{
          bottom: 15,
          right: 15
        }}
      /> */}
    </>
  )
}
