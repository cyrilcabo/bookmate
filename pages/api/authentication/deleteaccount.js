import database from '../../../utils/database';

import {ObjectId} from 'mongodb';

export const config = {
	api: {
		bodyParser: false,
	}
}

const deleteAccount = async (req, res) => {
	const id = req.user._id;
	const {deleteId} = req.body;


	if (!req.isAuthenticated() || (ObjectId(id).toString() !== ObjectId(deleteId).toString())) {
		res.json({status: 'err'});
	} else {
		console.log("delete account request processed");
		await database().then(db => {
			return db.collection('users').deleteOne({_id: ObjectId(id)});
		}).then(result => {
			req.logout();
			req.session.destroy();
			res.json({status: 'ok'});
		});
	}
}

export default deleteAccount;