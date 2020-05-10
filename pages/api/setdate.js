import {withSession} from 'next-session';

const setDate = (req, res) => {
	const {startDate, endDate} = req.body;
	req.session.currentBooking = {
		...req.session.currentBooking,
		bookDate: {
			startDate: startDate,
			endDate: endDate,
		}
	}
	res.json({status: "ok"});
}

export default withSession(setDate, {name: "bookMate"});