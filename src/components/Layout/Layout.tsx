import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import queryClient from '../../queryClient';
import AuthProvider from '../../providers/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export default function Layout({children}: {children: any}) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </AuthProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
