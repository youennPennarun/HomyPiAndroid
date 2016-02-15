import Settings from "../settings";
import UserAPI from "../apis/UserAPI";

const API = "/api/raspberries";

export const REQUEST_ALL = "RASPBERRY_REQUEST_ALL";
export const RECEIVE_ALL = "RASPBERRY_RECEIVE_ALL";

export const SELECTED_RASPBERRY = "SELECTED_RASPBERRY";
export const SELECTED_DEFAULT = "SELECTED_DEFAULT";

export const UPDATE_STATUS = "RASPBERRY_UPDATE_STATUS";
export const NEW = "RASPBERRY_NEW";
export const REMOVE = "RASPBERRY_REMOVE";

export function requestAll(raspberries) {
	return {
		type: REQUEST_ALL,
		raspberries
	}
}
export function receiveAll(data) {
	return {
		type: RECEIVE_ALL,
		...data
	}
}

export function fetchAll(user) {
	return dispatch => {
		dispatch(requestAll())
		return fetch(Settings.getServerUrl() + API + "/", {
			headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				    "Authorization": "Bearer " + user.token
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					// TODO
				} else {
					dispatch(receiveAll(json.data));
					//dispatch(selectedDefaultRaspberry());
				}
			})
	}
}

export function selectedRaspberry(raspberry) {
	return {
		type: SELECTED_RASPBERRY,
		raspberry: raspberry
	}
}
export function selectedDefaultRaspberry(raspberries) {
	return {
		type: SELECTED_RASPBERRY,
		raspberry: selectRaspberry(raspberries)
	}
}

function selectRaspberry(raspberries, current) {
	let found = null;
	if (!current && raspberries && raspberries.length) {
		raspberries.every((rasp) => {
			if (rasp.state === "UP") {
				found = rasp;
				return false;
			}
			return true;
		});
		return found;
	}
}
