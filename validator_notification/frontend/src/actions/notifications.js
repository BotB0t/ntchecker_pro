import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_NOTIFICATION } from "./types";

// GET NOTIFICATIONS BY USER
export const getNotifications = () => (dispatch, getState) => {
  axios
    .get("/notification", tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_NOTIFICATION,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
