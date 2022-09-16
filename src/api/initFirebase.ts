import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../../env";

let myApp = initializeApp(FIREBASE_CONFIG);

const auth = getAuth(myApp);
const firestore = getFirestore(myApp);

export { auth, firestore };
