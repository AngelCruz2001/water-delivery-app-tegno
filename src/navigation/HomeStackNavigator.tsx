import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../presentation/screens/home/HomeScreen';
import { PermissionScreen } from '../presentation/screens/permission/PermissionScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { LoadingScreen } from '../presentation/screens/loading/LoadingScreen';
import { colors } from '../config/theme/colors';

const Stack = createStackNavigator();

export function HomeStackNavigator() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        </Stack.Navigator>
    );
}