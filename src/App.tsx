
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SideMenuNavigator } from './navigation';
import { PermissionsChecker } from './providers/PermissionsChecker';
import { colors } from './config/theme/colors';
import { QueryProvider } from './providers/QueryClient';
import Toast from 'react-native-toast-message';
import { toastConfig } from './presentation/components/toasts/toasts';
import { RootStackNavigator } from './navigation/RootStackNavigator';
import { AuthWrapper } from './providers/AuthWrapper';



function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <QueryProvider>
        <AuthWrapper>
          <RootStackNavigator />
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
