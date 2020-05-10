import {withSession} from 'next-session';

const selectRoom = async(req, res) => {
	const currentBooking = req.session.currentBooking;
	res.json({status: 'ok', booking: currentBooking});
}

export default withSession(selectRoom, {name: "bookMate"});