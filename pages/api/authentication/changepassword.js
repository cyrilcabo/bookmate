import database from '../../../utils/database';

import {withSession} from 'next-session';
import {ObjectId} from 'mongodb';

const changePassword = async (req, res) => {
	const {id, isGuest} = req.session.user;
	const {password} = req.body;
	if (isGuest) {
		res.json({status: 'err'});
	} else {
		await database().then(db => {
			return db.collection('users').updateOne({_id: ObjectId(id)}, {
				$set: {
					password: password,
				}
			});
		}).then((result) => {
			res.json({status: 'ok'});
		});
	}
}

export default withSession(changePassword, {name: 'bookMate'});