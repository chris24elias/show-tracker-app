import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Center, Heading, VStack } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import AppHeader from '../../components/AppHeader'
import TextInput2 from '../../components/form/TextInput2'
import useAuthStore from '../../stores/auth'
import strings from '../../strings'
import { LogError } from '../../utils/Logger'

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup
    .string()
    .email('please enter a valid email address')
    .required('email address is required'),
  password: yup
    .string()
    .required('password is required')
    .min(6, 'Password should be at least 6 characters')
})

const defaultValues = {
  name: ``,
  email: ``,
  password: ''
}

type SignupFormData = {
  name: string
  email: string
  password: string
}

interface SignupProps {
  navigation: any
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setError
  } = useForm<SignupFormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })
  const signup = useAuthStore((state) => state.signup)

  const onSignupPress = ({ name, email, password }: SignupFormData) => {
    signup(name, email, password)
      .then(() => {
        console.log('LOGGED IN')
      })
      .catch((e) => {
        LogError('LOGIN ERROR', e)

        // check type of error and display accordingly
        setError('password', {
          message: 'Invalid Email or Password'
        })
      })
  }

  return (
    <Box flex={1} bg="mainBg.500">
      <AppHeader title="" showBack />
      <Center w="100%">
        <Box p="2" w="90%" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50'
            }}
            fontWeight="semibold"
          >
            Signup
          </Heading>
          <VStack space={3} mt="5">
            <TextInput2
              control={control}
              name="name"
              error={errors?.name?.message}
              label={strings.signup.nameInput}
              testID="name-input"
              touched={touchedFields.name}
            />
            <TextInput2
              control={control}
              name="email"
              error={errors?.email?.message}
              label={strings.signup.emailInput}
              testID="email-input"
              touched={touchedFields.email}
            />
            <TextInput2
              control={control}
              name="password"
              error={errors?.password?.message}
              label={strings.signup.passwordInput}
              testID="password-input"
              touched={touchedFields.password}
              type="password"
            />
            <Button
              mt="2"
              bg="secondary.500"
              onPress={handleSubmit(onSignupPress)}
              _text={{
                fontSize: 'md',
                fontWeight: 'semibold'
              }}
            >
              Continue
            </Button>
          </VStack>
        </Box>
      </Center>
    </Box>
  )
}

export default Signup
