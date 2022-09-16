import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import Login from "../screens/Login";
import Landing from "../screens/Landing";
import Signup from "../screens/Signup";

// SCREENS

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.landing}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.landing} component={Landing} />
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
