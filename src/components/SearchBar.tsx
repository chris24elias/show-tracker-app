import type { IInputProps } from 'native-base'
import React from 'react'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { SearchBar as SearchBarElements } from 'react-native-elements'

import { Colors } from '../theme'

interface SearchBarProps extends IInputProps {
  control: Control<any>
  name: string
}

const SearchBar: React.FC<SearchBarProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <SearchBarElements
          containerStyle={{
            backgroundColor: 'transparent',
            width: '100%',
            alignSelf: 'center',
            // minHeight: 30,
            height: 35,
            borderRadius: 12
          }}
          inputContainerStyle={{
            backgroundColor: Colors.mainBg[300],
            marginLeft: 0,
            marginRight: 0
          }}
          inputStyle={{
            color: Colors.white
          }}
          placeholder="Search..."
          onChangeText={onChange}
          value={value}
          platform="ios"
          cancelButtonProps={{
            buttonTextStyle: {
              color: Colors.primary[500]
            }
          }}
          {...rest}
        />
      )}
      name={name}
    />
  )
}

export default SearchBar

const styles = StyleSheet.create({})
