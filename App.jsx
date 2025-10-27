import './global.css';
import React, { useEffect } from 'react';
import './firebaseconfig'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { scheduleDailyReminder } from './ReminderManager';
import TEST from 'app/screens/LoginScreen';

// ✅ Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const initNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted');
        return;
      }

      // await scheduleDailyReminder();
    };

    initNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAD4C0' }}>
        <StatusBar style="dark" />
        <TEST />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
