import moment from 'moment';

const initialState = {
	user: {
		isGuest: null,
		id: "",
		details: {},
		bookings: [],
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
}

export default initialState;