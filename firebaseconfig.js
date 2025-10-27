import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBd-WDW4tyfhm_qdrvp4_c2if6ZxGrG2hI",
  authDomain: "msapp-16118.firebaseapp.com",
  projectId: "msapp-16118",
  storageBucket: "msapp-16118.firebasestorage.app",
  messagingSenderId: "973090407436",
  appId: "1:973090407436:web:e20d4f7ec9311cf3f55a29"
};

let app;
if (getApps().length === 0) {
  console.log('Initializing Firebase app...');
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { app as firebaseApp, auth as firebaseAuth, db as firebaseData };
