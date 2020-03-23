import { combineReducers } from "redux";
import devices from "./devices";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import notifications from "./notifications";

export default combineReducers({
  devices,
  errors,
  messages,
  auth,
  notifications
});
