import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import SavedShowDetails from '../screens/SavedShowDetails'
import { SeasonDetails } from '../screens/SeasonDetails'
import BottomTabNavigator from './BottomTabNavigator'
import type { RootStackParamList } from './NavigationTypes'
import routes from './routes'
import useDataListeners from './useDataListeners'

const Stack = createStackNavigator<RootStackParamList>()

const MainStack: React.FC = () => {
  useDataListeners()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name={routes.showDetails} component={SavedShowDetails} />
      <Stack.Screen name={'SeasonDetails'} component={SeasonDetails} />
    </Stack.Navigator>
  )
}

export default MainStack
