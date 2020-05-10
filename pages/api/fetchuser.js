import database from '../../utils/database';

import {withSession} from 'next-session';
import {ObjectId} from 'mongodb';

const fetchUser = async (req, res) => {
	const {isGuest, id} = req.session.user;
	if (!isGuest) {
		const user = await database().then(db => {
			return db.collection('users').find({_id: ObjectId(id)}).project({
				username: '$username',
				details: '$details',
				bookings: '$bookings',
			}).toArray();
		});
		const {_id, ...newUser} = user[0];
		const details = Object.keys(newUser.details).length ?newUser.details :req.session.user.details;
		res.json({id: _id, ...newUser, details});
	} else {
		res.json(req.session.user);
	}
}

export default withSession(fetchUser, {name: 'bookMate'});