import {
  GET_NOTIFICATIONS_ALL,
  GET_GENERAL_NOTIFICATIONS,
  GET_INDIVIDUAL_NOTIFICATIONS,
} from "../actions/types.js";

const initialState = {
  generalNotifications: [],
  individualNotifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_ALL:
      return {
        ...state,
        individualNotifications: action.payload,
      };
    case GET_GENERAL_NOTIFICATIONS:
      return {
        ...state,
        generalNotifications: action.payload,
      };
    case GET_INDIVIDUAL_NOTIFICATIONS:
      return {
        ...state,
        individualNotifications: action.payload,
      };
    default:
      return state;
  }
}
