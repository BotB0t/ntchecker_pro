import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_DEVICES, DELETE_DEVICE, ADD_DEVICE } from "./types";

// GET USERS
export const getDevices = () => (dispatch, getState) => {
  axios
    .get("/user", tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_DEVICES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE USER
export const deleteDevice = id => (dispatch, getState) => {
  axios
    .delete(`/user/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteDevice: `Device ID(${id}) Deleted` }));
      dispatch({
        type: DELETE_DEVICE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD USER
export const addDevice = device => (dispatch, getState) => {
  axios
    .post(`/user`, device, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch(createMessage({ addDevice: `Device ${device.username} added` }));
      dispatch({
        type: ADD_DEVICE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
