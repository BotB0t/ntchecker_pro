import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_INDIVIDUAL_NOTIFICATIONS,
} from "./types";

// GET ALL INDIVIDUAL NOTIFICATIONS BY GENERAL ID
export const getIndividualNotifications = (params) => (dispatch, getState) => {
  axios
    .get("/notification/all", {
      params: params,
      headers: tokenConfig(getState).headers,
    })
    .then((res) => {
      dispatch({
        type: GET_INDIVIDUAL_NOTIFICATIONS,
        payload: res.data.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
