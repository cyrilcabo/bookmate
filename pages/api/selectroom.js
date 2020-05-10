import {withSession} from 'next-session';

const selectRoom = async(req, res) => {
	const {locId, property, room} = req.body;
	req.session.currentBooking = {
		...req.session.currentBooking,
		locId,
		property,
		room: room,
	}
	res.json({status: 'ok'});
}

export default withSession(selectRoom, {name: "bookMate"});