import database from '../../utils/database';

import {withSession} from 'next-session';
import {ObjectId} from 'mongodb';

const fetchUser = async (req, res) => {
	if (req.isAuthenticated()) {
		res.json({...req.user, ...req.user.details});
	} else {
		res.json(req.session.user);
	}
}

export default fetchUser;