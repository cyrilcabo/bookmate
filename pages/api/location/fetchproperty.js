import database from '../../../utils/database';
import { ObjectId } from 'mongodb';

export const config = {
	api: {
		bodyParser: false,
	},
}

const fetchProperty = async (req, res) => {
	const {filters, index, id} = req.body;
	const property = await database().then(db => db.collection('locations').aggregate([
		{
			$match: {
				_id: ObjectId(id),
			}
		},
		{
			$project: {
				_id: 1,
				name: 1,
				location: 1,
				address: 1,
				properties: {
					$slice: [
						{
							$map: {
								input: {
									$filter: {
										input: "$properties",
										cond: {
											$setIsSubset: [filters, "$$this.amenities"],
										}
									}
								},
								as: "property",
								in: {
									_id: "$$property._id",
									title: "$$property.title",
									location: "$$property.location",
									details: "$$property.details",
									amenities: "$$property.amenities",
									imgSrc: "$$property.imgSrc",
									price: {
										$min: "$$property.rooms.price"
									},
									ratings: {
										$avg: "$$property.rating"
									}
								}
							}
						},
						parseInt(index),
						10,
					],
				}
			}
		},
	]).toArray());
	res.status(200).json({
		result: property[0], 
		index: index,
		filters: filters,
	});
}

export default fetchProperty;