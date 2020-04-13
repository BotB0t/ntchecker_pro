import { combineReducers } from "redux";
import devices from "./devices";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import notifications from "./notifications";
import generalNotifications from "./generalNotifications";
import data from "./data";

export default combineReducers({
  devices,
  errors,
  messages,
  auth,
  notifications,
  generalNotifications,
  data
});
