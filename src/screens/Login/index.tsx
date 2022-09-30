import React from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import TextInput from "../../components/form/TextInput";
import strings from "../../strings";
import AppHeader from "../../components/AppHeader";
import { LogError } from "../../utils/Logger";
import useAuthStore from "../../stores/auth";
import TextInput2 from "../../components/form/TextInput2";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email address")
    .required("email address is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "Password should be at least 6 characters"),
});

interface LoginProps {
  navigation: any;
}

type LoginFormData = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "chris24elias@gmail.com",
  password: "pass1234",
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
  } = useForm<LoginFormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const login = useAuthStore((state) => state.login);
  const onLoginPress = ({ email, password }: LoginFormData) => {
    login(email, password)
      .then(() => {
        //
      })
      .catch((e) => {
        LogError("LOGIN ERROR", e);
        setError("password", {
          message: "Invalid Email or Password",
        });
      });
  };
  return (
    <Box flex={1} bg="mainBg.500">
      <AppHeader title="" showBack />
      <Center w="100%">
        <Box p="2" py="8" w="90%">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Login
          </Heading>

          <VStack space={3} mt="5">
            <TextInput2
              control={control}
              name="email"
              error={errors?.email?.message}
              label={strings.login.emailInput}
              testID="email-input"
              touched={touchedFields.email}
            />
            <TextInput2
              control={control}
              name="password"
              error={errors?.password?.message}
              label={strings.login.passwordInput}
              testID="password-input"
              touched={touchedFields.password}
              type="password"
            >
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="2"
              >
                Forgot Password?
              </Link>
            </TextInput2>

            <Button
              mt="2"
              bg="secondary.500"
              _text={{
                fontSize: "md",
                fontWeight: "semibold",
              }}
              onPress={handleSubmit(onLoginPress)}
            >
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("signup")}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
