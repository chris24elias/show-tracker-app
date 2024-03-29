import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import Search from '../screens/Discover'
import SettingsScreen from '../screens/SettingsScreen'
import Watching from '../screens/Watching'
import { Colors } from '../theme'
import type { BottomTabParamList } from './NavigationTypes'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={'WatchingTab'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.mainBg[500],
          borderTopWidth: 0
        }
      }}
    >
      <BottomTab.Screen
        name={'WatchingTab'}
        component={Watching}
        options={{
          tabBarLabel: 'Watching',
          tabBarIcon: ({ color }) => <Ionicons name="md-tv-outline" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name={'SearchTab'}
        component={Search}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass-outline" color={color} />
        }}
      />
      <BottomTab.Screen
        name={'SettingsTab'}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings-sharp" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}
