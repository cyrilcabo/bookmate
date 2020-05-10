import database from '../../../utils/database';

import {withSession} from 'next-session';
import {ObjectId} from 'mongodb';

const deleteAccount = async (req, res) => {
	const {id, isGuest} = req.session.user;
	const {deleteId} = req.body;
	
	if (isGuest || (id !== deleteId)) {
		res.json({status: 'err'});
	} else {
		await database().then(db => {
			return db.collection('users').deleteOne({_id: ObjectId(id)});
		}).then(result => {
			res.json({status: 'ok'});
		});
	}
}

export default withSession(deleteAccount, {name: 'bookMate'});