import {withSession} from 'next-session';

export const config = {
	api: {
		bodyParser: false,
	}
}

const setDate = (req, res) => {
	const {startDate, endDate} = req.body;
	req.session.currentBooking = {
		...req.session.currentBooking,
		bookDate: {
			start: startDate,
			end: endDate,
		}
	}
	res.json({status: "ok"});
}

export default setDate;