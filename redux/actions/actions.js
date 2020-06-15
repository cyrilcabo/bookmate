import fetch from 'isomorphic-unfetch';

//use appropriate host for appropriate environment
//Production:
const production = 'https://bookmate.herokuapp.com';
//Local machine development:
const localDev = 'http://localhost:3000';

const host = production;


export function fetchProperties(id, filters, index) {
	return {
		type: "FETCH_PROPERTIES",
		payload: fetch(`${host}/api/location/fetchproperty`, {
			method: "POST",
			body: JSON.stringify({
				id: id,
				filters: filters,
				index: index,
			}),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => data.json()),
	}
}

export function searchRandomProperty() {
	return {
		type: "SEARCH_RANDOM_PROPERTY",
		payload: fetch(`${host}/api/location/randomproperty`).then(res => res.json()).then(res => res.id),
	}
}

export function fetchFilters() {
	return {
		type: "FETCH_FILTERS",
		payload: fetch(`${host}/api/utils/filters`).then(res => res.json()),
	}
}



export function setSearchFilters(filters) {
	return {
		type: "SET_FILTERED",
		payload: filters,
	}
}

export function setSearchId (id) {
	return {
		type: "SET_SEARCH_ID",
		payload: id,
	}
}

export function setSearchBookDate (date) {
	return {
		type: "SET_SEARCH_BOOKDATE",
		payload: date,
	}
}

export function setCurrentBooking (room) {
	return {
		type: "SET_CURRENT_BOOKING",
		payload: room,
	}
}

export function fetchHot (limit) {
	return {
		type: "FETCH_HOT",
		payload: fetch(`${host}/api/location/fetchhot?limit=`+limit).then(data => data.json()).then(res => res.result),
	}
}

export function fetchUser (user) {
	return {
		type: "FETCH_USER",
		payload: user,
	}
}

export function fetchBookings (bookings) {
	return {
		type: "FETCH_BOOKINGS",
		payload: bookings,
	}
}

export function viewBooking (booking) {
	return {
		type: "VIEW_BOOKING",
		payload: booking
	}
}