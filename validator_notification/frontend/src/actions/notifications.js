import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_NOTIFICATION, UPDATE_NOTIFICATION } from "./types";

// GET NOTIFICATIONS BY USER
export const getNotifications = () => (dispatch, getState) => {
  axios
    .get("/notification", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE NOTIFICATION
export const updateNotification = (notification, id) => (
  dispatch,
  getState
) => {
  axios
    .put(`/notification/${id}`, notification, tokenConfig(getState))
    .then(res => {
      console.log("Status response: " + res.status);
      dispatch(
        createMessage({ updateNotification: `Notificación actualizada` })
      );
      dispatch({
        type: UPDATE_NOTIFICATION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
