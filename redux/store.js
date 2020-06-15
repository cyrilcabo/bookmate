import moment from 'moment';

const initialState = {
	user: {
		isGuest: null,
		id: "",
		details: {},
		bookings: [],
		currentBooking: {
			bookDate: {start: "", end: ""},
			locId: "",
			property: {},
			room: {},
		}
	},
	search: {
		id: "",
		filters: [],
		bookDate: {
			start: moment(),
			end: moment().add(1, "days"),
		}
	},
	filters: [],
	properties: {},
	bookings: [],
	hot: [],
	viewBooking: {
		bookingId: "",
		booking: {
			property: {},
			room: {},
		},
		user: {},
	}
}

export default initialState;