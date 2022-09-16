import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Splash from "../screens/Splash";
import { isReadyRef } from "./RootNavigation";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import useAuthStore from "../stores/auth";

const Stack = createStackNavigator();

export default function Navigation() {
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
    //  linking={LinkingConfiguration}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user === null ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : user ? (
          <Stack.Screen name="MainStack" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
