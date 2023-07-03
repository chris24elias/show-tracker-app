import { Box, Button, Flex, Image } from 'native-base'
import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'

import routes from '../../navigation/routes'

interface LandingProps {
  navigation: any
}

const Landing: React.FC<LandingProps> = ({ navigation }) => {
  const window = useWindowDimensions()
  return (
    <Box flex={1} bg="mainBg.500" safeAreaBottom>
      <Flex flex={1} justifyContent="center" alignItems="center">
        {/* <Heading fontSize={84}>Show Tracker</Heading> */}
        <Image
          source={require('../../assets/images/ShowTracker.png')}
          resizeMode="contain"
          style={{
            // height: 700,
            width: window.width * 0.7
          }}
          alt="logo"
        />
      </Flex>
      <Button
        _text={{
          fontSize: 'lg',
          fontWeight: 'semibold'
        }}
        _pressed={{
          bg: 'secondary.500',
          opacity: 0.8
        }}
        bg="secondary.500"
        width="90%"
        mb="2"
        alignSelf="center"
        onPress={() => navigation.navigate(routes.signup)}
      >
        Sign up
      </Button>
      <Button
        _text={{
          color: 'white',
          fontSize: 'xs'
        }}
        width="90%"
        variant="ghost"
        mb="2"
        alignSelf="center"
        onPress={() => navigation.navigate(routes.login)}
      >
        Already have an account? Login
      </Button>
    </Box>
  )
}

export default Landing

const styles = StyleSheet.create({})
