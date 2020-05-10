import fetch from 'isomorphic-unfetch';


export function fetchProperties(id, filters, index) {
	return {
		type: "FETCH_PROPERTIES",
		payload: fetch("https://bookmate.herokuapp.com/api/location/fetchproperty", {
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

export function fetchFilters() {
	return {
		type: "FETCH_FILTERS",
		payload: fetch("https://bookmate.herokuapp.com/api/utils/filters").then(res => res.json()),
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

export function fetchHot (limit) {
	return {
		type: "FETCH_HOT",
		payload: fetch('https://bookmate.herokuapp.com/api/location/fetchhot?limit='+limit).then(data => data.json()).then(res => res.result),
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