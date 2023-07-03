import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Icon, IconButton } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const FloatingBackButton: React.FC = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const size = 40
  return (
    <Box
      style={{
        position: 'absolute',
        top: insets.top,
        left: '2%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: size / 2
      }}
    >
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<Icon size="lg" as={<Feather name="chevron-left" />} color="white" />}
      />
    </Box>
  )
}

export default FloatingBackButton

const styles = StyleSheet.create({})
