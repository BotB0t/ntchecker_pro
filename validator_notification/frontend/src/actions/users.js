import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_USERS, DELETE_USER, ADD_USER } from "./types";

// GET USERS
export const getUsers = () => (dispatch, getState) => {
  axios
    .get("/user", tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE USER
export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/user/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteUser: `User ID(${id}) Deleted` }));
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD USER
export const addUser = user => (dispatch, getState) => {
  axios
    .post(`/user`, user, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch(createMessage({ addUser: `User ${user.username} added` }));
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
