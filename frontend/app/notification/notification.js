// store/actions/notification.js
import { createAction } from '@reduxjs/toolkit';

export const SEND_NOTIFICATION = createAction('SEND_NOTIFICATION');

// Action creator with payload
export const sendNotificationAction = (userId, type, message) => {
  return {
    type: SEND_NOTIFICATION,
    payload: { userId, type, message },
  };
};

