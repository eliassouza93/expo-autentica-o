
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';


const firebaseConfig = {
    '..'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

const auth = initializeAuth(app)

export {auth}
