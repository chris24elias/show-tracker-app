import React from "react";
import { StyleSheet } from "react-native";
import { IInputProps } from "native-base";
import { SearchBar as SearchBarElements } from "react-native-elements";
import { Control, Controller } from "react-hook-form";
import { Colors } from "../theme";

interface SearchBarProps extends IInputProps {
  control: Control<any>;
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <SearchBarElements
          containerStyle={{
            backgroundColor: "transparent",
            width: "95%",
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: Colors.mainBg[300],
          }}
          inputStyle={{
            color: Colors.white,
          }}
          placeholder="Search..."
          onChangeText={onChange}
          value={value}
          platform="ios"
          cancelButtonProps={{
            buttonTextStyle: {
              color: Colors.primary[500],
            },
          }}
          {...rest}
        />
      )}
      name={name}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
