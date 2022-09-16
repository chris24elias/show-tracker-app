import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

let myApp = initializeApp(FIREBASE_CONFIG);
initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = getAuth(myApp);
const firestore = getFirestore(myApp);

export { auth, firestore };
