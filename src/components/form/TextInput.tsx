import React from "react";
import { StyleSheet, TextInput as RNInput, TextInputProps } from "react-native";
import { Controller, Control } from "react-hook-form";
import {
  Box,
  IInputProps,
  Text,
  Center,
  IBoxProps,
  useTheme,
} from "native-base";

interface ITextInputProps extends IBoxProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
  touched: boolean | undefined;
  inputProps?: TextInputProps;
}

const TextInput: React.FC<ITextInputProps> = ({
  control,
  name,
  label,
  error,
  touched,
  inputProps,
  ...rest
}) => {
  const isSuccess = touched && !error;
  const isError = error;
  const { colors } = useTheme();
  return (
    <Box mt="2" {...rest}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNInput
            style={[
              styles.input,
              {
                padding: 13,
                width: "100%",
                alignSelf: "center",
                color: "white",
                borderWidth: 1,
                borderColor: colors.secondary[500],
              },
              isError
                ? {
                    //   borderColor: Colors.red
                    // color: Colors.red
                  }
                : {},
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={label}
            placeholderTextColor={colors.muted[500]}
            value={value}
            {...inputProps}
          />
        )}
        name={name}
      />

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </Box>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
  errorMessage: {
    color: "red",
    paddingLeft: 5,
    marginTop: 5,
  },
});
