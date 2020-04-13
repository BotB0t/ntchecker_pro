import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_GENERAL_NOTIFICATIONS,
	ADD_GENERAL_NOTIFICATION_FAIL,
	ADD_GENERAL_NOTIFICATION,
	DELETE_GENERAL_NOTIFICATION,
	DELETE_GENERAL_NOTIFICATION_FAIL
} from "./types";

// GET ALL GENERAL NOTIFICATIONS
export const getGeneralNotificationsAll = () => (dispatch, getState) => {
	axios
		.get("/notification/general", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_GENERAL_NOTIFICATIONS,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};


// ADD GENERAL NOTIFICATION
export const addGeneralNotification = notification => (dispatch, getState) => {
	axios
		.post("/notification/general", notification, tokenConfig(getState))
		.then(res => {
			dispatch(
				createMessage({ addGeneralNotification: `Notificación General ${notification.title} añadida` })
			);
			dispatch({
				type: ADD_GENERAL_NOTIFICATION,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: ADD_GENERAL_NOTIFICATION_FAIL
			});
		});
};

// REMOVE GENERAL NOTIFICATION
export const deleteGeneralNotification = (id, title) => (dispatch, getState) => {
	axios
		.delete(`/notification/general/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch(
				createMessage({ deleteGeneralNotification: `Notificación General ${title} borrada` })
			);
			dispatch({
				type: DELETE_GENERAL_NOTIFICATION,
				payload: id
			});
		})
		.catch(err => {
			console.log(err);
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: DELETE_GENERAL_NOTIFICATION_FAIL
			});
		});
};