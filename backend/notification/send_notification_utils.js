// backend/notification/send_notification_utils.js
import { User } from './models';

export async function sendNotification(userId, type, message) {
  const user = await User.findById(userId);

  // You can define different notification types and customize the message accordingly
  switch (type) {
    case 'Item Added to Cart':
      user.sendNotification(message);
      break;
    case 'Cart Updated':
      user.sendNotification(message);
      break;
    case 'Checkout Messages':
      user.sendNotification(message);
      break;
    case 'Errors or Issues':
      user.sendNotification(message);
      break;
    default:
      // Handle unknown notification types or fallback logic
      break;
  }
}

