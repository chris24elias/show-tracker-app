import { Button, Center } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import AppHeader from "../../components/AppHeader";
import useAuthStore from "../../stores/auth";
import { Page } from "../../theme";

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Page>
      <AppHeader title="Settings" />
      <Center flex={1}>
        <Button onPress={() => logout()}>LOGOUT</Button>
      </Center>
    </Page>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
