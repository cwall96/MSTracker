import './global.css';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { scheduleDailyReminder } from './ReminderManager'; // ✅ Make sure this is exported
import TEST from 'app/screens/LoginScreen';

// ✅ Set up the notification handler
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

      //await scheduleDailyReminder();
    };

    initNotifications();
  }, []);

  return <TEST />;
}
