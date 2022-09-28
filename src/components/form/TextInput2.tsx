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
  FormControl,
  Input,
} from "native-base";

interface ITextInputProps extends IInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
  touched: boolean | undefined;
}

const TextInput2: React.FC<ITextInputProps> = ({
  control,
  name,
  label,
  error,
  touched,
  children,
  ...rest
}) => {
  const isSuccess = touched && !error;
  const isError = error;
  const { colors } = useTheme();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl>
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            placeholderTextColor={colors.muted[500]}
            value={value}
            {...rest}
          />
          {children}
        </FormControl>
      )}
      name={name}
    />
  );
};

export default TextInput2;
