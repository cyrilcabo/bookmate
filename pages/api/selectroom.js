import {withSession} from 'next-session';

import database from '../../utils/database';

import {ObjectId} from 'mongodb';

export const config = {
	api: {
		bodyParser: false,
	}
}

const selectRoom = async(req, res) => {
	const {id} = req.body;
	//Extract information from session booking
	const {locId, property} = req.session.currentBooking;
	//Validate user payload
	if (req.session.user._id || req.user._id) {
		await database().then(db => db.collection('locations').find({_id: ObjectId(locId)}).project({
			properties: {
				$elemMatch: {
					_id: ObjectId(property._id),
				}
			}
		}).toArray()).then(res => res[0].properties[0]).then(result => {
			//Extract room from result
			const resultRoom = result.rooms.find(r => ObjectId(r._id).toString()===id);

			if (!result || (!resultRoom || !resultRoom.state.available)) {
				res.json({status: 'err', msg: 'property doesnt exist'});
			} else {
				//Extract unneeded information for booking
				const extract = (root, type) => {
					if (type=="room") {
						const {state, ...newRoot} = root;
						return newRoot;
					} else {
						const {imgSrc, ...newRoot} = root;
						return newRoot;
					}
				}

				//Save booking information to current session
				req.session.currentBooking = {
					...req.session.currentBooking,
					property: extract(property, "property"),
					room: {
						...extract(resultRoom, "room"),
						price: resultRoom.price.price,
					},
				}
				res.json({status: 'ok'});
			}
		});
	} else {	
		res.json({status: 'err', msg: 'rejected'});
	}
}

export default withSession(selectRoom, {name: "bookMate"});