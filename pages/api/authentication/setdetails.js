import database from '../../../utils/database';

import {withSession} from 'next-session';
import {ObjectId} from 'mongodb';

const setDetails = async (req, res) => {
	const {isGuest, id} = req.session.user;
	const {details} = req.body;
	if (isGuest) {
		res.json({status: 'err'});
	} else {
		await database().then(db => {
			return db.collection('users').updateOne({_id: ObjectId(id)}, {
				$set: {
					details: details,
				}
			});
		}).then((result) => {
			res.json({status: 'ok'});
		});
	}
}

export default withSession(setDetails, {name: 'bookMate'});