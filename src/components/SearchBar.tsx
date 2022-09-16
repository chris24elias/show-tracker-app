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
  // return (
  //   <VStack space={8} width="90%" alignSelf="center">
  //     <VStack width="100%" space={2}>
  //       <Controller
  //         control={control}
  //         render={({ field: { onChange, onBlur, value } }) => (
  //           <Input
  //             placeholder="Search"
  //             variant="filled"
  //             width="100%"
  //             bg="mainBg.300"
  //             borderRadius={10}
  //             py={1}
  //             px={2}
  //             //   _web={{
  //             //     _focus: { borderColor: 'secondary.500', style: { boxShadow: 'none' } }
  //             //   }}
  //             // _focus={{ borderColor: 'secondary.500' }}
  //             borderWidth={0}
  //             InputLeftElement={
  //               <Icon
  //                 // size="sm"
  //                 ml={2}
  //                 size={5}
  //                 color="primary.500"
  //                 as={<Ionicons name="ios-search" />}
  //               />
  //             }
  //             color="primary.500"
  //             placeholderTextColor="primary.500"
  //             {...rest}
  //             onBlur={onBlur}
  //             onChangeText={onChange}
  //             value={value}
  //           />
  //         )}
  //         name={name}
  //       />
  //     </VStack>

  //     {/* <VStack width="100%" space={2}>
  //       <Box>Material</Box>
  //       <Input
  //         placeholder="Search People & Places"
  //         bg="#fff"
  //         width="100%"
  //         borderRadius={4}
  //         py={3}
  //         px={1}
  //         fontSize={14}
  //         _web={{
  //           _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } }
  //         }}
  //         InputLeftElement={
  //           <Icon size="sm" m={2} size={6} color="gray.400" as={<MaterialIcons name="search" />} />
  //         }
  //         InputRightElement={
  //           <Icon size="sm" m={2} size={6} color="gray.400" as={<MaterialIcons name="mic" />} />
  //         }
  //       />
  //     </VStack> */}
  //   </VStack>
  // );
};

export default SearchBar;

const styles = StyleSheet.create({});
