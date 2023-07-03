import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'

import useCachedResources from './src/hooks/useCachedResources'
import Navigation from './src/navigation'
import theme from './src/theme'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// Create a client
const queryClient = new QueryClient()

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
