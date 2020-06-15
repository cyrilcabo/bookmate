import database from '../../../utils/database';
import {ObjectId} from 'mongodb';

import bcrypt from 'bcrypt';

export const config = {
	api: {
		bodyParser: false,
	}
}

const changePassword = async (req, res) => {
	const saltRounds = 10;
	const id = req.user._id;
	const {password} = req.body;
	if (!req.isAuthenticated()) {
		res.json({status: 'err'});
	} else {
		await bcrypt.hash(password, saltRounds, async (err, hash) => {
			if (hash) {	
				await database().then(db => {
					return db.collection('users').updateOne({_id: ObjectId(id)}, {
						$set: {
							password: hash,
						}
					});
				}).then((result) => {
					if (result) res.json({status: 'ok'});
					else res.json({status: 'err'});
				}).catch(err => {
					res.json({status: 'err'});
				});
			} else {
				res.json({status: 'err'});
			}
		});
	}
}

export default changePassword;