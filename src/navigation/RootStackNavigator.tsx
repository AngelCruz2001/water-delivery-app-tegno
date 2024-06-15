

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { LoadingScreen } from "../presentation/screens/loading/LoadingScreen";
import { colors } from "../config/theme/colors";
import { LoginScreen } from "../presentation/screens/LoginScreen";
import { AppNavigator } from "./SideMenuNavigator";
import { useQueryClient } from "@tanstack/react-query";
import { getToken } from "../presentation/api/api";

export type RootStackProps = {
  "LoginScreen": undefined
  "App Navigator": undefined
  "LoadingScreen": undefined
}
const Stack = createStackNavigator<RootStackProps>();

export function RootStackNavigator() {

  return (
    <>
      <Stack.Navigator
        initialRouteName='LoadingScreen'
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="App Navigator" component={AppNavigator} />
      </Stack.Navigator>
    </>
  );
}