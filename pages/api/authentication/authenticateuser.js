const authenticateUser = (req, res) => {
	if (req.isAuthenticated()) {
		res.json(true);
	} else {
		res.json(false);
	}
}

export default authenticateUser;