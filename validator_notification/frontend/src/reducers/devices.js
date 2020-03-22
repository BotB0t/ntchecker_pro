import {
  ADD_DEVICE,
  GET_DEVICES,
  DELETE_DEVICE,
  CLEAR_DEVICES
} from "../actions/types.js";

const initialState = {
  devices: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: action.payload
      };
    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    case ADD_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload]
      };
    case CLEAR_DEVICES:
      return {
        ...state,
        leads: []
      };
    default:
      return state;
  }
}
