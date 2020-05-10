import database from '../../../utils/database';

const fetchHot = async (req, res) => {
	const {limit} = req.query;
	const hotOffers = await database().then(db => {
		return db.collection('locations').aggregate([
			{
				$sample: {
					size: 10,
				}
			},
			{
				$unwind: "$properties"
			},
			{
				$project: {
					property: {
						_id: "$properties._id",
						title: "$properties.title",
						location: "$properties.location",
						details: "$properties.details",
						amenities: "$properties.amenities",
						imgSrc: "$properties.imgSrc",
						price: {
							price: {
								$min: "$properties.rooms.price.price",
							},
						},
						ratings: {
							$avg: "$properties.rating"
						}
					},
				}
			},
			{
				$sort: {
					"property.price.price": 1,
				}
			},
			{
				$limit: parseInt(limit),
			}
		]).toArray();
	});
	res.json({status: "ok", result: hotOffers});
}

export default fetchHot;