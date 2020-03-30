import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_NOTIFICATIONS_CSV } from "./types";

// GET ALL NOTIFICATIONS
export const getNotificationsCSV = () => (dispatch, getState) => {
  axios
    .get("/notification/all", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS_CSV,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
