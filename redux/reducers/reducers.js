import initialState from '../store';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

function propertiesReducer(state=initialState.properties, action) {
	switch (action.type) {
		case "FETCH_PROPERTIES_FULFILLED":
			const data = (!!state[action.payload.result["_id"]])
							?(action.payload.index)
								?state[action.payload.result["_id"]].properties
								:[]
							:[];
			return {
				...state,
				[action.payload.result["_id"]]: {
					...action.payload.result,
					properties: [
						...data,
						...action.payload.result["properties"],
					],
					index: parseInt(action.payload.index),
					hasMore: (!(action.payload.result["properties"].length < 10)),
				}
			}
		default: return state;
	}
}


function filtersReducer(state=initialState.filters, action) {
	switch (action.type) {
		case "FETCH_FILTERS_FULFILLED":
			return action.payload;
		default: return state;
	}
}

function bookingsReducer (state=initialState.bookings, action) {
	switch (action.type) {
		case "FETCH_BOOKINGS":
			return action.payload;
		default: return state;
	}
}

function hotReducer (state = initialState.hot, action) {
	switch (action.type) {
		case "FETCH_HOT_FULFILLED":
			return action.payload;
		default: return state;
	}
}

function searchReducer (state = initialState.search, action) {
	switch (action.type) {
		case "SEARCH_RANDOM_PROPERTY_FULFILLED":
			return {
				...state,
				id: action.payload,
			};
		case "SET_SEARCH_ID":
			return {
				...state,
				id: action.payload,
			};
		case "SET_FILTERED":
			return {
				...state,
				filters: action.payload,
			};
		case "SET_SEARCH_BOOKDATE": {
			return {
				...state,
				bookDate: action.payload,
			}
		}
		default: return state;
	}
}

function userReducer (state = initialState.user, action) {
	switch (action.type) {
		case "FETCH_USER":
			return action.payload;
		case "SET_CURRENT_BOOKING": {
			return {
				...state,
				currentBooking: action.payload,
			}
		}
		default: return state;
	}
}

function viewBookingReducer (state = initialState.viewBooking, action) {
	switch (action.type) {
		case "VIEW_BOOKING":
			const {bookingId, property, room, user} = action.payload; 
			return {
				...state,
				bookingId: bookingId,
				booking: {
					property: property,
					room: room,
				},
				user: user,
			};
		default: return state;
	}
}

const reducers = combineReducers({
	properties: propertiesReducer,
	filters: filtersReducer,
	bookings: bookingsReducer,
	hot: hotReducer,
	search: searchReducer,
	user: userReducer,
	viewBooking: viewBookingReducer
});

const makeStore = (state=initialState) => {
	return createStore(reducers, state, applyMiddleware(promise));
};


export default makeStore;