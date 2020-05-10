import database from '../../../utils/database';

const register = async (req, res) => {
	const {username, password} = req.body;
	const user = await database().then(db => {
		return db.collection('users').insertOne({
			username: username,
			password: password,
			bookings: [],
			details: {},
		})
	});
	res.json({status: 'ok'});
}

export default register;