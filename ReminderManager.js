import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

// Utility to clear old schedules (optional)
export const clearAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const scheduleDailyReminder = async () => {
  const triggerTime = new Date();
  triggerTime.setHours(11); // 6 PM
  triggerTime.setMinutes(30);
  triggerTime.setSeconds(0);

  // If it's already past 6PM today, schedule for tomorrow
  const now = new Date();
  if (now > triggerTime) {
    triggerTime.setDate(triggerTime.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "Don't forget to log your symptoms!",
      sound: 'default',
    },
    trigger: {
      hour: 11,
      minute: 30,
      repeats: true,
    },
  });

  console.log("📅 Daily 6PM notification scheduled");
};