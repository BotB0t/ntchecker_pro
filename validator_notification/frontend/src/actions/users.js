import axios from "axios";

import { GET_USERS, DELETE_USER, ADD_USER } from "./types";

// GET USERS
export const getUsers = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE USER
export const deleteUser = id => dispatch => {
  axios
    .delete(`/user/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD USER
export const addUser = (user) => dispatch => {
  axios
    .post(`/user`, user)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
