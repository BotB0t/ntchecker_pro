import axios from "axios";
import { createMessage, returnErrors } from "./messages";

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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE USER
export const deleteUser = id => dispatch => {
  axios
    .delete(`/user/${id}`)
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
export const addUser = user => dispatch => {
  axios
    .post(`/user`, user)
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
