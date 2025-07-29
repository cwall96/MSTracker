import * as Notifications from 'expo-notifications';

const ReminderManager = {
  async start() {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to log your symptoms",
        body: 'Check in before the day ends!',
        sound: true,
      },
      trigger: {
        hour: 18, // 8 PM
        minute: 0,
        repeats: false,
      },
    });
  },
};

export default ReminderManager;