import database from '../../utils/database';

import {ObjectId} from 'mongodb';

const fetchBookings = async (req, res) => {
	const bookings = await database().then(db => {
		const {hotelid, bookingid} = req.query;
		return db.collection('bookings').aggregate([
			{
				$match: {
					_id: ObjectId(hotelid),
				}
			},
			{
				$project: {
					records: {
						$map: {
							input: {
								$filter: {
									input: "$records",
									as: "booking",
									cond: {
										$eq: ["$$booking.bookingId", ObjectId(bookingid)],
									}
								}
							},
							as: "booking",
							in: {
								bookingId: "$$booking.bookingId",
								propertyTitle: "$$booking.property.title",
								roomTitle: "$$booking.room.title",
								roomAmenities: "$$booking.room.amenities",
								roomDetails: "$$booking.room.details",
								price: "$$booking.room.price",
								ratings: "$$booking.property.rating",
							}
						}
					}
				}
			},
			{
				$unwind: {
					path: '$records',
					preserveNullAndEmptyArrays: true,
				}
			}
		]).toArray();
	});
	res.json({status: 'ok', result: bookings});
}

export default fetchBookings;