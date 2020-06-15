import database from '../../../utils/database';

import {apiValidateUsername} from '../../../utils/api';

import bcrypt from 'bcrypt';

export const config = {	
	api: {
		bodyParser: false,
	}
}

const register = async (req, res) => {
	const saltRounds = 10;
	if (!req.isAuthenticated()) {
		const {username, password} = req.body;
		const validUsername = await apiValidateUsername(username);
		if (validUsername.status !== "ok" || password.length < 6 || username.length < 6) {
			if (validUsername.status !=="ok") res.json({status: 'err', message: "Username already exists."});
			else res.json({status: 'err', message: "You didn't fill the fields right."});
		} else {
			await bcrypt.hash(password, saltRounds, async (err, hash) => {
				if (hash) {
					await database().then(db => {
						return db.collection('users').insertOne({
							username: username,
							password: hash,
							bookings: [],
							details: {},
						});
					}).then(response => {
						if (response) res.json({status: 'ok'});
						else res.json({status: 'err', message: "Something went wrong."});
					});
				} else {
					res.json({status: 'err', message: "Something went wrong."});
				}
			});
		}
	} else {
		res.json({status: 'err', message: "You are already logged in."});
	}
}

export default register;