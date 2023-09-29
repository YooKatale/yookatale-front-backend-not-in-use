// frontend/src/components/utils/notifications.js
import { v4 as uuidv4 } from 'uuid'; // You may need to install this library

const notifications = [];

export const showToast = (message, type = 'info') => {
  const id = uuidv4(); // Generate a unique ID for each notification

  const notification = {
    id,
    message,
    type,
  };

  notifications.push(notification);

  // Remove the notification after a certain duration (e.g., 5 seconds)
  setTimeout(() => {
    removeNotification(id);
  }, 5000); // Adjust the duration as needed
};

export const removeNotification = (id) => {
  const index = notifications.findIndex((notification) => notification.id === id);

  if (index !== -1) {
    notifications.splice(index, 1);
  }
};

export const getNotifications = () => notifications;

