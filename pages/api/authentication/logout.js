import {withSession} from 'next-session';

import uniqueID from '../../../utils/uid';

const logout = (req, res) => {
	req.session.user = {
		id: uniqueID(),
		isGuest: true,
		bookings: [],
		details: {
			"First Name": "", 
			"Last Name": "", 
			"Email Address": "", 
			"Number": "", 
			"Address": "", 
		}
	};
	req.session.currentBooking = {
		locId: "",
		property: "",
		room: "",
		bookDate: {
			startDate: "",
			endDate: "",
		}
	};
	res.json({status: 'ok'});
}

export default withSession(logout, {name: 'bookMate'});