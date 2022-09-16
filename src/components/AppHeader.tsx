import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../theme";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  renderRight?: any;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack,
  showMenu,
  renderRight,
}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const renderLeft = () => {
    if (showBack) {
      return (
        <IconButton
          onPress={() => navigation.goBack()}
          icon={
            <Icon
              size="md"
              as={<Feather name="chevron-left" />}
              color="white"
            />
          }
        />
      );
    }
    if (showMenu) {
      return (
        <IconButton
          icon={
            <Icon size="sm" as={<MaterialIcons name="menu" />} color="white" />
          }
        />
      );
    }

    return null;
  };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.mainBg[500]}
        barStyle="light-content"
      />

      <Box safeAreaTop backgroundColor={Colors.mainBg[500]} />

      <HStack
        height={height * 0.08}
        bg={Colors.mainBg[500]}
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={4} alignItems="center">
          <Box>{renderLeft()}</Box>
          <Text color="white" fontSize={20} fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack space={2}>{renderRight ? renderRight() : null}</HStack>
      </HStack>
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
