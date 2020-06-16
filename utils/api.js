//Api calls

import fetch from 'isomorphic-unfetch';

//use appropriate host for appropriate environment
//Production:
const production = 'https://bookmate.herokuapp.com';
//Local machine development:
const localDev = 'http://localhost:3000';

const host = production;

export async function apiSetDate (start, end) {
	return await fetch(`${host}/api/setdate`, {
		method: "POST",
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			startDate: start,
			endDate: end,
		})
	});
}

export async function apiFetchSearch (search) {
	return await fetch(`${host}/api/fetchsearch?location=${search}`);
}

export async function apiFetchUser (cookie) {
	return await fetch(`${host}/api/fetchuser`, {
		headers: {
			...cookie,
		}
	});
}

export async function apiAuthenticateUser (cookie) {
	return await fetch(`${host}/api/authentication/authenticateuser`, {headers: {...cookie}}).then(res => res.json());
}

export async function apiViewProperty (locid, propertyid) {
	return await fetch(`${host}/api/viewproperty/${locid}/${propertyid}`);
}

export async function apiGetSelectedRoom (cookie) {
	return await fetch(`${host}/api/getselectedroom`, {
		headers: {
			...cookie,
		}
	});
}

export async function apiSetSelectedRoom (id) {
	return await fetch(`${host}/api/selectroom`, {
		'method': 'POST',
		'headers': {
			'content-type': 'application/json'
		},
		'body': JSON.stringify({
			id: id,
		})
	});
}

export async function apiBookRoom (details) {
	return await fetch(`${host}/api/bookroom`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			userDetails: details,
		})
	});
}

export async function apiLogin (user) {
	return await fetch(`${host}/api/authentication/login`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'content-type': 'application/json',
		}
	})
}

export async function apiValidateUsername (username) {
	return await fetch(`${host}/api/authentication/validateusername?username=${username}`).then(res => res.json());
}

export async function apiRegister (user) {
	return await fetch(`${host}/api/authentication/register`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(user),
	});
}

export async function apiFetchBooking (hotelId, bookingId, cookie) {
	return await fetch(`${host}/api/fetchbooking?hotelid=${hotelId}&bookingid=${bookingId}`, {
		credentials: 'include',
		headers: {
			...cookie,
		}
	});
}

export async function apiChangePassword (password) {
	return await fetch(`${host}/api/authentication/changepassword`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			password: password,
		}),
	});
}

export async function apiSetDetails (details) {
	return await fetch(`${host}/api/authentication/setdetails`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			details: details,
		}),
	});
}

export async function apiDeleteAccount (id) {
	return await fetch(`${host}/api/authentication/deleteaccount`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({deleteId: id}),
	});
}

export async function apiLogout () {
	return await fetch(`${host}/api/authentication/logout`);
}

export async function apiFetchBilling () {
	return await fetch(`${host}/api/payment/billing`);
}

export async function apiVerifyPayment (id) {
	return await fetch(`${host}/api/payment/verify/${id}`);
}