import passport from 'passport';
import database from './middleware';
import local from 'passport-local';
import {withSession} from 'next-session';
import { ObjectId } from 'mongodb';

const LocalStrategy = local.Strategy;

const authenticateUser = async (username, password, done) => {
	return await database().then(db => db.collection('users').findOne({username: username, password: password})).then(user => done(null, user));
}

passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async(id, done) => {
	const user = await database().then(db => db.collection('users').findOne({_id: ObjectId(id)}));
	return done(null, user)
});

const withPassport = handler => {
	return withSession((req, res) => {passport.initialize()(req, res, () => {
			return passport.session()(req, res, () => {
				return handler(req, res, passport);
			});
		});
	}, {'name': 'bookMate'});
}

export default withPassport ;