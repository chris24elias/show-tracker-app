import React from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Center } from "native-base";
import TextInput from "../../components/form/TextInput";
import { LogError } from "../../utils/Logger";
import AppHeader from "../../components/AppHeader";
import strings from "../../strings";
import useAuthStore from "../../stores/auth";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("please enter a valid email address")
    .required("email address is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "Password should be at least 6 characters"),
});

const defaultValues = {
  name: ``,
  email: ``,
  password: "",
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

interface SignupProps {
  navigation: any;
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
  } = useForm<SignupFormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const signup = useAuthStore((state) => state.signup);

  const onSignupPress = ({ name, email, password }: SignupFormData) => {
    signup(name, email, password)
      .then(() => {
        console.log("LOGGED IN");
      })
      .catch((e) => {
        LogError("LOGIN ERROR", e);

        // check type of error and display accordingly
        setError("password", {
          message: "Invalid Email or Password",
        });
      });
  };

  return (
    <Box flex={1} bg="mainBg.500">
      <AppHeader title="Signup" showBack />
      <Center flex={1}>
        <TextInput
          w="90%"
          control={control}
          name="name"
          error={errors?.name?.message}
          label={strings.signup.nameInput}
          testID="name-input"
          touched={touchedFields.name}
        />
        <TextInput
          w="90%"
          control={control}
          name="email"
          error={errors?.email?.message}
          label={strings.signup.emailInput}
          testID="email-input"
          touched={touchedFields.email}
        />
        <TextInput
          w="90%"
          control={control}
          name="password"
          error={errors?.password?.message}
          label={strings.signup.passwordInput}
          testID="password-input"
          inputProps={{
            secureTextEntry: true,
          }}
          touched={touchedFields.password}
        />
        <Button
          mt="4"
          w="90%"
          bg="secondary.500"
          onPress={handleSubmit(onSignupPress)}
        >
          Signup
        </Button>
      </Center>
    </Box>
  );
};

export default Signup;
