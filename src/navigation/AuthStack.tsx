import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import routes from './routes'

// SCREENS

const Stack = createStackNavigator()

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.landing}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false
      }}
    >
      <Stack.Screen name={routes.landing} component={Landing} />
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={Signup} />
    </Stack.Navigator>
  )
}

export default AuthStack
