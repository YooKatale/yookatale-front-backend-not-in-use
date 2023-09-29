// backend/notification/send_notification.js
import { sendNotification } from './send_notification_utils';

export const sendNotificationController = async (req, res) => {
  const { userId, type, message } = req.body;

  try {
    await sendNotification(userId, type, message);

    res.status(200).json({
      message: 'Notification sent successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to send notification.',
    });
  }
};

