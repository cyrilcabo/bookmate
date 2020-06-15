import database from '../../../../utils/database';

import {ObjectId} from 'mongodb';

const viewProperty = async (req, res) => {
	const {locid, id} = req.query;
	//Query database for property
	const property = await database().then(db => {
		return db.collection("locations").aggregate([
			{
				$match: {
					_id: ObjectId(locid),
				}
			},
			{
				$unwind: {
					path: "$properties",
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$match: {
					"properties._id": ObjectId(id),
				},
			},
			{
				$addFields: {
					"properties.rating": {
						$avg: "$properties.rating",
					}
				}
			}
		]).toArray();
	});
	//Extract unneeded properties
	const {rooms, images, ...newProperty} = property[0].properties;
	//Save property selection to currentbooking
	req.session.currentBooking = {
		...req.session.currentBooking,
		locId: property[0]._id,
		property: newProperty,
	}

	//Send response for UI
	res.json({
		status: "ok",
		locId: property[0]._id,
		property: property[0].properties,
	});
}

export default viewProperty;