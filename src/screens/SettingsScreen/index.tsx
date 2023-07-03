import { Box, Button, Center, Heading } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import useAuthStore from '../../stores/auth'
import { Page } from '../../theme'

interface SettingsScreenProps {
  navigation: any
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout)

  return (
    <Page safeAreaTop>
      <Box flexDirection="row" marginY={4} marginX={3} justifyContent="space-between">
        <Heading>Settings</Heading>
      </Box>
      <Center flex={1}>
        <Button onPress={() => logout()}>LOGOUT</Button>
      </Center>
    </Page>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})
