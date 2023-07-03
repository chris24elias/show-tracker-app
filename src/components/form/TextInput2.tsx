import type { IInputProps } from 'native-base'
import { FormControl, Input, useTheme } from 'native-base'
import React from 'react'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface ITextInputProps extends IInputProps {
  control: Control<any>
  name: string
  label: string
  error?: string
  touched: boolean | undefined
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
  const isSuccess = touched && !error
  const isError = error
  const { colors } = useTheme()
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
  )
}

export default TextInput2
