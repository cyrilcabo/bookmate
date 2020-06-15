import database from '../../../utils/database';

import {ObjectId} from 'mongodb';

export const config = {
	api: {
		bodyParser: false,
	}
}

const setDetails = async (req, res) => {
	const id = req.user._id;;
	const {details} = req.body;
	if (!req.isAuthenticated() || !req.body.details) {
		res.json({status: 'err'});
	} else {
		await database().then(db => {
			return db.collection('users').updateOne({_id: ObjectId(id)}, {
				$set: {
					details: details,
				}
			});
		}).then((result) => {
			if (result) res.json({status: 'ok'});
			else res.json({status: 'err'});
		}).catch(err => {
			res.json({status: 'err'});
		});
	}
}

export default setDetails;