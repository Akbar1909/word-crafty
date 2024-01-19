import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import queryClient from '../../queryClient';
import AuthProvider from '../../providers/AuthProvider';

export default function Layout({children}: {children: any}) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <PaperProvider>{children}</PaperProvider>
          </QueryClientProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
