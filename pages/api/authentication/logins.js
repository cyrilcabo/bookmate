import database from '../../../utils/database';
import {withSession} from 'next-session';

const Login = async (req, res) => {
	const {username, password} = req.body;
	const user = await database().then(db => {
		return db.collection('users').find({
			username: username,
			password: password,
		}).project({password: 0}).toArray();
	});
	if (!user.length) {
		res.json({status: 401, message: 'Invalid credentials!'});
	} else {
		const {_id, ...newUser} = user[0];
		req.session.user = {
			isGuest: false,
			id: user[0]._id,
			...newUser,
		}
		res.json({status: 200, message: 'Login successful!'});
	}
}

export default withSession(Login, {name: 'bookMate'});