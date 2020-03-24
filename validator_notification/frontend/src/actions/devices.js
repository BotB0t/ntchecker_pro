import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_DEVICES,
  DELETE_DEVICE,
  ADD_DEVICE,
  ADD_DEVICE_FAIL
} from "./types";

// GET USERS
export const getDevices = () => (dispatch, getState) => {
  axios
    .get("/device", tokenConfig(getState))
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
export const deleteDevice = (id, name) => (dispatch, getState) => {
  axios
    .delete(`/device/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteDevice: `Device ${name} Deleted` }));
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
    .post(`/device`, device, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch(
        createMessage({ addDevice: `Dispositivo ${device.name} añadido` })
      );
      dispatch({
        type: ADD_DEVICE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_DEVICE_FAIL
      });
    });
};
