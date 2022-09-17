import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "./NavigationTypes";
import routes from "./routes";
import SavedShowDetails from "../screens/SavedShowDetails";
import useDataListeners from "./useDataListeners";
import { SeasonDetails } from "../screens/SeasonDetails";

const Stack = createStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  useDataListeners();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name={routes.showDetails} component={SavedShowDetails} />
      <Stack.Screen name={"SeasonDetails"} component={SeasonDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
