import axios from "axios";

import { GET_USERS } from "./types";

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
