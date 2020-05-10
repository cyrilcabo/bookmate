import database from '../../utils/database';

import {ObjectId} from 'mongodb';

const fetchBooking = async (req, res) => {
	const {hotelid, bookingid} = req.query;
	const booking = await database().then(db => {
		return db.collection('bookings').find({_id: ObjectId(hotelid)}).project({
			records: {
				$elemMatch: {
					bookingId: ObjectId(bookingid),
				}
			}
		}).toArray();
	});
	res.json(booking[0].records[0]);
}

export default fetchBooking;