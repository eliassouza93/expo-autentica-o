
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';


const firebaseConfig = {
    apiKey: "AIzaSyAYSllmLyWThzkcsMgiIuCTYaYQ1bDKYcE",
    authDomain: "esporte-4e3d9.firebaseapp.com",
    projectId: "esporte-4e3d9",
    storageBucket: "esporte-4e3d9.appspot.com",
    messagingSenderId: "811814096998",
    appId: "1:811814096998:web:e93d77752a74d11d8b9da7",
    measurementId: "G-VVJWEDZ37B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

const auth = initializeAuth(app)

export {auth}