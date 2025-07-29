import './global.css';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import ReminderManager from './ReminderManager'; // Assuming this schedules reminders
import TEST from 'app/screens/LoginScreen';

// Optional: Configure notification behavior
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

      // Start your reminder logic
      ReminderManager.start(); // Make sure this function exists
    };

    initNotifications();
  }, []);

  return <TEST />;
}
