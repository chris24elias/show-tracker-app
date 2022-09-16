import React from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Center } from "native-base";
import TextInput from "../../components/form/TextInput";
import strings from "../../strings";
import AppHeader from "../../components/AppHeader";
import { LogError } from "../../utils/Logger";
import useAuthStore from "../../stores/auth";

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
      <AppHeader title="Login" showBack />
      <Center flex={1}>
        <TextInput
          w="90%"
          control={control}
          name="email"
          error={errors?.email?.message}
          label={strings.login.emailInput}
          testID="email-input"
          touched={touchedFields.email}
        />
        <TextInput
          w="90%"
          control={control}
          name="password"
          error={errors?.password?.message}
          label={strings.login.passwordInput}
          inputProps={{
            secureTextEntry: true,
          }}
          testID="password-input"
          touched={touchedFields.password}
        />
        <Button
          bg="secondary.500"
          mt="4"
          w="90%"
          _text={{
            fontSize: "md",
            fontWeight: "semibold",
          }}
          onPress={handleSubmit(onLoginPress)}
        >
          Login
        </Button>
      </Center>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
