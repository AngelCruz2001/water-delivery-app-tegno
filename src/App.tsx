
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './config/theme/colors';
import { QueryProvider } from './providers/QueryClient';
import Toast from 'react-native-toast-message';
import { toastConfig } from './presentation/components/toasts/toasts';
import { RootStackNavigator } from './navigation/RootStackNavigator';
import { AuthWrapper } from './providers/AuthWrapper';
import { WebsocketLocationProvider } from './providers/WebsocketLocationProvider';



function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <QueryProvider>
        <AuthWrapper>
          <WebsocketLocationProvider>
            <RootStackNavigator />
          </WebsocketLocationProvider>
        </AuthWrapper>
        {/* <SideMenuNavigator /> */}
        <Toast config={toastConfig} />
      </QueryProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
