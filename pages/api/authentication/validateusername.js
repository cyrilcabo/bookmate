import database from '../../../utils/database';

const validateUsername = async (req, res) => {
	const {username} = req.query;
	const user = await database().then(db => {
		return db.collection('users').find({
			username: username,
		}).project({username: 1}).toArray();
	});
	if (user.length) {
		res.json({status: 'err'});
	} else {
		res.json({status: 'ok'});
	}
}

export default validateUsername;