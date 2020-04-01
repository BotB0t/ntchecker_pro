import {
  ADD_NOTIFICATION,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/types.js";

const initialState = {
  notifications_new: [],
  notifications_read: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION:
      const notifications = action.payload;
      var notifications_new = [],
        notifications_read = [];
      notifications.map(notification => {
        if (notification.status === "NEW")
          notifications_new = [...notifications_new, notification];
        else if (notification.status === "READ") {
          notifications_read = [...notifications_read, notification];
        }
      });
      return {
        ...state,
        notifications_new: notifications_new,
        notifications_read: notifications_read
      };
    case UPDATE_NOTIFICATION:
      // const updatedNotifications = state.notifications;
      const updateNotification = action.payload;
      var notifications_new = state.notifications_new;
      var notifications_read = state.notifications_read;
      // console.log(updateNotification);

      // Check if notification exists in notifications_new
      var index = state.notifications_new.findIndex(
        notification => notification.id === updateNotification.id
      );
      // console.log(index);
      // Notification exists in notifications_new
      if (index != -1) {
        // delete from notifications_new
        notifications_new = state.notifications_new.filter(
          notification => notification.id !== updateNotification.id
        );
        // add to notifications_read
        notifications_read = [...state.notifications_read, updateNotification];
      } else {
        // update notification in notification_read
        state.notifications_read.map(notification => {
          if (notification.id == updateNotification.id) {
            notification.status = updateNotification.status;
            notification.option_selected = updateNotification.option_selected;
          }
        });
        notifications_read = state.notifications_read;
      }

      // console.log(notifications_read);

      return {
        ...state,
        notifications_new: notifications_new,
        notifications_read: notifications_read
      };
    // case DELETE_NOTIFICATION:
    //   return {
    //     ...state,
    //     notifications: state.notifications.filter(
    //       notification => notification.id !== action.payload
    //     )
    //   };
    // case ADD_NOTIFICATION:
    //   return {
    //     ...state,
    //     notifications: [...state.notifications, action.payload]
    //   };
    // case CLEAR_NOTIFICATIONS:
    //   return {
    //     ...state,
    //     notifications: []
    //   };
    default:
      return state;
  }
}
