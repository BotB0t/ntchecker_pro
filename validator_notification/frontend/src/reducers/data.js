import { GET_NOTIFICATIONS_CSV } from "../actions/types.js";

const initialState = {
  notifications_csv: String
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_CSV:
      return { ...state, notifications_csv: action.payload };
    default:
      return state;
  }
}
