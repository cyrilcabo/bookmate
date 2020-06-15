import database from '../../../utils/database';

import {ObjectId} from 'mongodb';

const deleteAccount = async (req, res) => {
	const id = req.user._id;
	const {deleteId} = req.body;
	
	if (!req.isAuthenticated() || (id !== deleteId)) {
		res.json({status: 'err'});
	} else {
		await database().then(db => {
			return db.collection('users').deleteOne({_id: ObjectId(id)});
		}).then(result => {
			res.json({status: 'ok'});
		});
	}
}

export default deleteAccount;