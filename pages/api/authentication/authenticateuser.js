import {withSession} from 'next-session';

const authenticateUser = (req, res) => {
	if (req.session.user && !req.session.user.isGuest) {
		res.json(true);
	} else {
		res.json(false);
	}
}

export default withSession(authenticateUser, {name: 'bookMate'});