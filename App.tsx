/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Layout from './src/components/Layout/Layout';
import MainScreens from './src/MainScreens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import {useAuth} from './src/providers/AuthProvider';
import WordScrambleScreen from './src/screens/WordScrambleScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const {hasValidToken} = useAuth();

  // return (
  //   <Stack.Navigator
  //     screenOptions={{headerShown: false}}
  //     initialRouteName={'WordScrambleScreen'}>
  //     <Stack.Screen name="WordScrambleScreen" component={WordScrambleScreen} />
  //   </Stack.Navigator>
  // );

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={false ? 'HomeScreen' : 'LoginScreen'}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={MainScreens} />
    </Stack.Navigator>
  );
}

const Root = () => {
  return (
    <Layout>
      <App />
    </Layout>
  );
};

export default Root;
