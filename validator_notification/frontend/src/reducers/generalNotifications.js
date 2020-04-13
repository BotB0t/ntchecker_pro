import {
	ADD_GENERAL_NOTIFICATION,
	GET_GENERAL_NOTIFICATIONS,
	DELETE_GENERAL_NOTIFICATION,
} from "../actions/types.js";

const initialState = {
	generalNotifications: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_GENERAL_NOTIFICATIONS:
			return {
				...state,
				generalNotifications: action.payload
			};
		case DELETE_GENERAL_NOTIFICATION:
			return {
				...state,
				generalNotifications: state.generalNotifications.filter(general => general.id !== action.payload)
			}
		case ADD_GENERAL_NOTIFICATION:
			return {
				...state,
				generalNotifications: [...state.generalNotifications, action.payload]
			};
		default:
			return state;
	}
}