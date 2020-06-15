import uniqueID from '../../../utils/uid';

const logout = (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		req.session.destroy();
		res.json({status: 'ok'});
	} else {
		res.json({status: 'err'});
	}
}

export default logout;