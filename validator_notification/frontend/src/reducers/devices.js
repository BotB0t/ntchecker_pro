import { ADD_DEVICE, GET_DEVICES, DELETE_DEVICE } from "../actions/types.js";

const initialState = {
  devices: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        devices: action.payload
      };
    case GET_DEVICES:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload)
      };
    case DELETE_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload]
      };
    default:
      return state;
  }
}
