import database from '../../../../utils/database';

import {ObjectId} from 'mongodb';

const viewProperty = async (req, res) => {
	const {locid, id} = req.query;
	const property = await database().then(db => {
		return db.collection("locations").find({ _id: ObjectId(locid) }).project({
			properties: {
				$elemMatch: {
					_id: ObjectId(id)
				}
			}
		}).toArray();
	});
	const {rating, ...newProperty} = property[0].properties[0];
	const newRating = rating.reduce((f, n) => f+n, 0)/rating.length;
	res.json({
		status: "ok",
		locId: property[0]._id,
		property: {
			...newProperty,
			rating: newRating,
		},
	});
}

export default viewProperty;